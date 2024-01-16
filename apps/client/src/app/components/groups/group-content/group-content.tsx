import PostList from '../../posts/post-list/post-list';
import { useGroupWindowContext } from '../../../contexts/group-window-provider/group-window-provider';

/* eslint-disable-next-line */
export interface IGroupContentProps {}

export function GroupContent(props: IGroupContentProps) {
  const { groupPostsListResult, isPostsLoading } = useGroupWindowContext();
  return (
    <PostList postList={groupPostsListResult} isLoading={isPostsLoading} />
  );
}

export default GroupContent;
