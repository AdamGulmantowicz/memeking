import { FileWithPath } from '@mantine/dropzone';
import { Record } from 'pocketbase';

export type TCreateGroupFunction = (title: string, users: string[]) => void;
export type TCreateGroupPostFunction = (
  contentText: string,
  groupId: string
) => void;
export type TSearchGroupFunction = (value: string) => void;
export type TLeaveGroupFunction = (groupId: string, users: string[]) => void;
export type TDeleteGroupFunction = (groupId: string) => void;
export type TJoinGroupFunction = (users: string[], groupId: string) => void;
export type TUpdateGroupImageFunction = (image: string, grouId: string) => void;
export interface IGroup extends Record {
  id: string;
  avatar: FileWithPath;
  title: string;
  aboutText: string;
  users: string[];
}

export interface IGroupContext {
  groupListResult: IGroup[] | null;
  groupSearchListResult: IGroup[] | null;
  isLoading: boolean;
  createGroup: TCreateGroupFunction;
  searchGroup: TSearchGroupFunction;
  joinGroup: TJoinGroupFunction;
  leaveGroup: TLeaveGroupFunction;
  deleteGroup: TDeleteGroupFunction;
  isGroupSearchLoading: boolean;
  isSearching: boolean;
}
