import { Container, ScrollArea } from '@mantine/core';
import { useFeedContext } from '../../contexts/feed-provider/feed-provider';
import Post from '../../components/posts/post/post';
import { CommentProvider } from '../../contexts/comment-provider/comment-provider';
import ContentFormBar from '../../components/content-form-bar/content-form-bar';
import { useState } from 'react';
import PostForm from '../../components/posts/post-form/post-form';
import LoaderComponent from '../../components/loader/loader';
import { IPost } from '../../contexts/post-provider/post-provider.interface';
import { usePostContext } from '../../contexts/post-provider/post-provider';

export interface IFeedProps {
  groupFeed?: boolean;
}

export function Feed({ groupFeed = false }: IFeedProps) {
  const { feedPostsList, groupListResult, isLoading } = useFeedContext();
  const { createPost, fullPostsList } = usePostContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleCreatePost = (values: IPost) => {
    createPost('', values.contentText);
  };

  const groupIds = groupListResult?.map((group) => group.id);

  const joinedGroupsPostsList = fullPostsList?.filter((post) =>
    groupIds?.includes(post?.group_id)
  );

  return (
    <LoaderComponent isLoading={isLoading}>
      <Container>
        <ScrollArea>
          {!groupFeed && <ContentFormBar onFormClick={handleToggleForm} />}
          {groupFeed
            ? joinedGroupsPostsList?.map((post) => (
                <CommentProvider key={post?.id} parentId={post?.id}>
                  <Post post={post} groups={groupListResult} />
                </CommentProvider>
              ))
            : feedPostsList?.map((post) => (
                <CommentProvider key={post?.id} parentId={post?.id}>
                  <Post post={post} groups={groupListResult} />
                </CommentProvider>
              ))}

          <PostForm
            isOpen={isOpen}
            onCloseForm={handleToggleForm}
            onFormSubmit={handleCreatePost}
          />
        </ScrollArea>
      </Container>
    </LoaderComponent>
  );
}

export default Feed;
