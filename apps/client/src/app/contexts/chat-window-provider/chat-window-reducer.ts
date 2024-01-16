import { IUser } from '../auth-provider/auth-provider.interface';
import { IChat } from '../chat-provider/chat-provider.interface';
import { IMessage } from './chat-window-provider.interface';

export interface IChatWindowState {
  chatId: string;
  currentChatUsers: IUser[] | IChat[] | null;
  currentChatUsersIds: string[];
  avatar: string;
  messages: IMessage[] | null;
  isSearchUsed: boolean;
  chatToAddList: IUser[] | null;
  isLoading: boolean;
}

export type TChatWindowActions =
  | { type: 'LOADING'; payload: null }
  | { type: 'LOADING_STOP'; payload: null }
  | { type: 'UPDATE_MESSAGES'; payload: IMessage[] | null }
  | { type: 'UPDATE_CHAT_DATA'; payload: IUser[] | IChat | null }
  | { type: 'UPDATE_TO_ADD_LIST'; payload: IUser[] | IChat | null }
  | { type: 'SEARCH_TO_ADD'; payload?: null }
  | { type: 'CANCEL_SEARCH_TO_ADD'; payload?: null };

export const Actions = {
  LOADING: 'LOADING',
  LOADING_STOP: 'LOADING_STOP',
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  UPDATE_CHAT_DATA: 'UPDATE_CHAT_DATA',
  UPDATE_TO_ADD_LIST: 'UPDATE_TO_ADD_LIST',
  SEARCH_TO_ADD: 'SEARCH_TO_ADD',
  CANCEL_SEARCH_TO_ADD: 'CANCEL_SEARCH_TO_ADD',
};

export const chatWindowReducer = (
  state: IChatWindowState,
  action: TChatWindowActions
): IChatWindowState => {
  switch (action.type) {
    case Actions.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.UPDATE_MESSAGES:
      return {
        ...state,
        isLoading: false,
        messages: action.payload as IMessage[],
      };
    case Actions.UPDATE_CHAT_DATA:
      return {
        ...state,
        isLoading: false,
        chatId: (action.payload as IChat)?.id,
        avatar: (action.payload as IChat).avatar,
        currentChatUsers: (action.payload as IChat).expand.users
          .map((user: IUser) => user)
          .flat() as IUser[],
        currentChatUsersIds: (action.payload as IChat)?.expand.users
          .map((user: IUser) => user.id)
          .flat(2) as string[],
      };
    case Actions.UPDATE_TO_ADD_LIST:
      return {
        ...state,
        isLoading: false,
        chatToAddList: action.payload as IUser[],
      };
    case Actions.SEARCH_TO_ADD:
      return {
        ...state,
        isLoading: false,
        isSearchUsed: true,
      };
    case Actions.CANCEL_SEARCH_TO_ADD:
      return {
        ...state,
        isLoading: false,
        isSearchUsed: false,
        chatToAddList: null,
      };
    default:
      throw new Error('Unknown action type');
  }
};
