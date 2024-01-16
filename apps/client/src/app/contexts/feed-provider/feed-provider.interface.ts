import { IGroup } from '../group-provider/group-provider.interface';
import { IPost } from '../post-provider/post-provider.interface';

export type TCreateGroupFunction = (title: string, users: string[]) => void;

export interface IFeedContext {
  isLoading: boolean;
  feedPostsList: IPost[] | null;
  groupListResult: IGroup[] | null;
}
