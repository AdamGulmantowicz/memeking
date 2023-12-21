/* eslint-disable-next-line */

import { ScrollArea, SimpleGrid, Stack } from '@mantine/core';
import { CommentProvider } from '../../../contexts/comment-provider/comment-provider';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import LoaderComponent from '../../loader/loader';
import Post from '../post/post';

export interface IPostListProps {
  postList: IPost[] | null;

  isLoading: boolean;
}
// TODO FIX LIST NOT EXTENDING TO FRAME WIDTH

export function PostList({ postList, isLoading }: IPostListProps) {
  return (
    <LoaderComponent isLoading={isLoading}>
      <Stack align="stretch">
        <ScrollArea mih={720} type="hover">
          {postList?.map((post: IPost) => (
            <CommentProvider key={post.id} parentId={post.id}>
              <Post post={post} groupsData={null} />
            </CommentProvider>
          ))}
        </ScrollArea>
      </Stack>
    </LoaderComponent>
  );
}

export default PostList;
