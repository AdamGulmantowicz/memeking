import { IUser } from '../auth-provider/auth-provider.interface';
import { Record } from 'pocketbase';

export type THandleOpenChatToggleFunction = (id: string) => void;

export type TLoadChatsFunction = () => void;
/* eslint-disable-next-line */
export type TCreateChatWithUserFunction = (otherUser: string) => void;
export type THandleSearchFuntion = (value: string) => void;
export type TGetListFunction = (value: string) => void;
export type THandleAddFollowingFunction = (id: string) => void;
export type THandleRemoveFollowingFunction = (id: string) => void;

export interface IChat extends Record {
  id: string;
  users: string[] | null;
  avatar: string;
  lastMessage?: string;
}

export interface IChatContext {
  openChats: IChat[] | null;
  handleSearch: THandleSearchFuntion;
  handleOpenChatToggle: THandleOpenChatToggleFunction;
  createChatWithUser: TCreateChatWithUserFunction;
  loadChats: TLoadChatsFunction;
  followersSearchList: IUser[] | [];
  userChatsList: IChat[] | null;
  followingList: IUser[] | null;
  isLoading: boolean;
  error: string | null;
  handleAddFollowing: THandleAddFollowingFunction;
  handleRemoveFollowing: THandleRemoveFollowingFunction;
}
