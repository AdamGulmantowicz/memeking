import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import { IChatWindowState, chatWindowReducer } from './chat-window-reducer';
import { pb } from '../../utils/pocketbase';
import {
  useChat,
  useMessage,
  useMessageList,
  useUserList,
} from '../../hooks/pb-utils';
import { IChat } from '../chat-provider/chat-provider.interface';
import { useAuthContext } from '../auth-provider/auth-provider';
import {
  IChatWindowContext,
  IMessage,
  TSendMessageFunction,
  TLeaveChatFunction,
  TUpdateChatFunction,
} from './chat-window-provider.interface';
import { IUser } from '../auth-provider/auth-provider.interface';

const initialState: IChatWindowState = {
  chatId: '',
  avatar: '',
  currentChatUsers: [],
  currentChatUsersIds: [],
  messages: [],
  isSearchUsed: false,
  chatToAddList: null,
  isLoading: false,
};

export const ChatWindowContext = React.createContext<IChatWindowContext | null>(
  null
);

interface IChatWindowProviderProps {
  children: React.ReactNode;
  currentChat: IChat;
}

export function ChatWindowProvider({
  children,
  currentChat,
}: IChatWindowProviderProps) {
  const [
    {
      avatar,
      messages,
      currentChatUsers,
      currentChatUsersIds,
      chatToAddList,
      isSearchUsed,
    },
    dispatch,
  ] = useReducer(chatWindowReducer, initialState);

  const chatId = currentChat.id;

  const {
    getFullList,
    result: messageDataResult,
    loading: isLoading,
  } = useMessageList();
  const { updateOne } = useChat(chatId);
  const { user } = useAuthContext();
  const { createOne } = useMessage();
  const { getList, result: searchToAddResult } = useUserList();

  useEffect(() => {
    dispatch({
      type: 'UPDATE_CHAT_DATA',
      payload: currentChat,
    });
  }, [currentChat]);

  const loadMessages = useCallback(() => {
    getFullList({
      sort: 'created',
      expand: 'author_id,',
      filter: `chat_id="${chatId}"`,
    });
  }, [getFullList, chatId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages, chatId]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_MESSAGES',
      payload: messageDataResult as IMessage[],
    });
  }, [messageDataResult]);

  useEffect(() => {
    pb.collection('messages').subscribe('*', async (e) => {
      if (e.record.chat_id === chatId) loadMessages();
    });
  }, [loadMessages, chatId]);

  const sendMessage: TSendMessageFunction = (message, recordId) => {
    if (!message || message.length === 0) return;
    createOne({
      content: `${message}`,
      author_id: `${user?.id}`,
      chat_id: `${recordId}`,
    });
  };

  const updateChat: TUpdateChatFunction = useCallback(
    (updatedUserId) => {
      if (currentChatUsersIds.includes(updatedUserId)) return;
      updateOne({
        users: [...currentChatUsersIds, updatedUserId],
      });
    },
    [updateOne, currentChatUsersIds]
  );

  const leaveChat: TLeaveChatFunction = useCallback(
    (chatId: string, users: string[]) => {
      updateOne({
        chatId,
        users: [users.filter((chatUser) => chatUser === user?.id)],
      });
    },
    [updateOne, user?.id]
  );

  const handleSearchToAdd = useCallback(
    (query: string) => {
      if (query.length >= 3) {
        dispatch({ type: 'SEARCH_TO_ADD' });
        getList({
          queryParams: { filter: `name~"${query}"` },
        });
      } else {
        dispatch({ type: 'CANCEL_SEARCH_TO_ADD' });
      }
    },
    [getList]
  );

  useEffect(() => {
    dispatch({
      type: 'UPDATE_TO_ADD_LIST',
      payload: searchToAddResult as IUser[],
    });
  }, [searchToAddResult]);

  return (
    <ChatWindowContext.Provider
      value={{
        chatId,
        avatar,
        messages,
        currentChatUsers,
        sendMessage,
        currentChatUsersIds,
        leaveChat,
        updateChat,
        chatToAddList,
        isSearchUsed,
        handleSearchToAdd,
        isLoading,
      }}
    >
      {children}
    </ChatWindowContext.Provider>
  );
}

export const useChatWindowContext = () => {
  const data = useContext(ChatWindowContext);

  if (!data) {
    throw Error(
      'useChatWindowContext should be used inside of ChatWindowProvider'
    );
  }

  return data;
};
