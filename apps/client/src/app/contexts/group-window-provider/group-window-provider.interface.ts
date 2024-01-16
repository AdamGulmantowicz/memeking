import { IPost } from '../post-provider/post-provider.interface';
import { IGroup } from '../group-provider/group-provider.interface';
import { FileWithPath } from '@mantine/dropzone';

export type TCreateGroupPostFunction = (
  contentText: string,
  groupId: string
) => void;

export type TLeaveGroupFunction = () => void;
export type TDeleteGroupFunction = (groupId: string) => void;
export type TJoinGroupFunction = (users: string[]) => void;
export type TUpdateGroupImageFunction = (image: FileWithPath[]) => void;
export type TUpdateGroupDescriptionFunction = (aboutText: string) => void;

export interface IGroupWindowContext {
  groupResult: IGroup | null;
  isLoading: boolean;
  joinGroup: TJoinGroupFunction;
  leaveGroup: TLeaveGroupFunction;
  deleteGroup: TDeleteGroupFunction;
  groupPostsListResult: IPost[] | null;
  isPostsLoading: boolean;
  createGroupPost: TCreateGroupPostFunction;
  updateGroupImage: TUpdateGroupImageFunction;
  updateGroupDescription: TUpdateGroupDescriptionFunction;
}
