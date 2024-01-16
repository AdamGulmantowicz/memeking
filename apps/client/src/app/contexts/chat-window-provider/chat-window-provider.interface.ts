import { IUser } from '../auth-provider/auth-provider.interface';
import { IChat } from '../chat-provider/chat-provider.interface';
import { Record } from 'pocketbase';

export type TSendMessageFunction = (message: string, recordId: string) => void;

export type TLeaveChatFunction = (chatId: string, users: string[]) => void;

export type TUpdateChatFunction = (updatedUserId: string) => void;

export type THandleSearchToAddFunction = (query: string) => void;

export interface IChatWindowContext {
  chatId: string;
  avatar: string;
  messages: IMessage[] | null;
  currentChatUsers: IUser[] | IChat[] | null;
  currentChatUsersIds: string[];
  sendMessage: TSendMessageFunction;
  updateChat: TUpdateChatFunction;
  leaveChat: TLeaveChatFunction;
  chatToAddList: IUser[] | null;
  isSearchUsed: boolean;
  handleSearchToAdd: THandleSearchToAddFunction;
  isLoading: boolean;
}

export interface IMessage extends Record {
  id: string;
  users: IUser[] | null;
  content: string;
  timestamp: string;
}
