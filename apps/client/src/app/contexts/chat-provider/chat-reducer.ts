import { IUser } from '../auth-provider/auth-provider.interface';
import { IChat } from './chat-provider.interface';

export interface IChatState {
  user: IUser | null;
  followersSearchList: IUser[] | [];
  followingList: IUser[] | null;
  userChatsList: IChat[] | null;
  openChats: IChat[] | null;
  isLoading: boolean;
  error: string | null;
}

export type TChatActions =
  | { type: 'LOADING'; payload: null }
  | { type: 'LOADING_STOP'; payload: null }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR'; payload: null | null }
  | { type: 'SIGNOUT'; payload: null }
  | { type: 'CANCEL_SEARCH'; payload?: null }
  | { type: 'UPDATE_USER'; payload: IUser | null }
  | { type: 'UPDATE_SEARCH'; payload: IUser[] | null }
  | { type: 'UPDATE_FOLLOWING'; payload: IUser | null }
  | { type: 'UPDATE_CHATS_LIST'; payload: IChat[] }
  | { type: 'UPDATE_OPEN_CHATS'; payload: string };

const Actions = {
  LOADING: 'LOADING',
  LOADING_STOP: 'LOADING_STOP',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  CANCEL_SEARCH: 'CANCEL_SEARCH',
  UPDATE_FOLLOWING: 'UPDATE_FOLLOWING',
  UPDATE_CHATS_LIST: 'UPDATE_CHATS_LIST',
  UPDATE_OPEN_CHATS: 'UPDATE_OPEN_CHATS',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SIGNOUT: 'SIGNOUT',
};

export const chatReducer = (
  state: IChatState,
  action: TChatActions
): IChatState => {
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

    case Actions.UPDATE_SEARCH:
      return {
        ...state,
        isLoading: false,
        followersSearchList: (action.payload as IUser[])?.filter(
          (follower: IUser) => follower.id !== state.user?.id
        ),
      };

    case Actions.CANCEL_SEARCH:
      return {
        ...state,
        isLoading: false,
        followersSearchList: [],
      };
    case Actions.UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload as IUser,
      };
    case Actions.UPDATE_FOLLOWING:
      return {
        ...state,
        isLoading: false,
        followingList: (action.payload as IUser)?.expand.followers?.map(
          (user: IUser) => user
        ),
      };
    case Actions.UPDATE_CHATS_LIST:
      return {
        ...state,
        isLoading: false,
        userChatsList: action.payload as IChat[],
      };

    case Actions.UPDATE_OPEN_CHATS:
      if (state.openChats?.some((chat) => chat.id === action.payload)) {
        return {
          ...state,
          openChats: state.openChats?.filter(
            (chat) => chat.id !== action.payload
          ),
        };
      } else {
        return {
          ...state,
          openChats: [
            ...(state.openChats as IChat[]),
            state.userChatsList?.filter(
              (chat: IChat) => chat.id === action.payload
            ),
          ].flat() as IChat[],
        };
      }
    case Actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    default:
      throw new Error('Unknown action type');
  }
};
