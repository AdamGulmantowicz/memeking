import React, { useCallback, useContext, useEffect } from 'react';
import { usePostList, usePost } from '../../hooks/pb-utils';
import { pb } from '../../utils/pocketbase';
import { useAuthContext } from '../auth-provider/auth-provider';
import { IPostContext } from './post-provider.interface';

import { IPost } from './post-provider.interface';

export const PostContext = React.createContext<IPostContext | null>(null);

export function PostProvider({ children }: React.PropsWithChildren) {
  const { user } = useAuthContext();
  const {
    getFullList,
    result: userPostsList,
    loading: isLoading,
  } = usePostList();
  const { createOne, deleteOne, updateOne } = usePost();

  // CHAT

  const loadPosts = useCallback(() => {
    if (user) {
      getFullList({
        sort: 'created',
        expand: 'upvote_ids, author_id',
        filter: `author_id~"${(user?.followers, user?.id)}"`,
      });
    }
  }, [user, getFullList]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    pb.collection('posts').subscribe('*', async (e) => {
      loadPosts();
    });
  }, [loadPosts, userPostsList]);

  const createPost = (title: string, contentText: string) => {
    if (contentText)
      createOne({
        author_id: user?.id,
        avatar: user?.avatar,
        title: title,
        contentText: contentText,
      });
  };

  const updatePost = (values: IPost, post: IPost) => {
    if (values && post)
      updateOne(
        {
          author_id: user?.id,
          avatar: post.avatar,
          title: values.title,
          contentText: values.contentText,
        },
        post.id
      );
  };

  const deletePost = async (id: string) => {
    await deleteOne(id);
    loadPosts();
  };

  const handleUpvote = (post: IPost) => {
    if (!user) return;
    if (post.upvote_ids.includes(user?.id)) {
      updateOne(
        {
          upvote_ids: post.upvote_ids.filter((id) => id !== user?.id),
        },
        post.id
      );
    } else {
      updateOne(
        {
          upvote_ids: [...post.upvote_ids, user?.id],
        },
        post.id
      );
    }
  };

  return (
    <PostContext.Provider
      value={{
        isLoading,
        userPostsList,
        handleUpvote,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePostContext = () => {
  const data = useContext(PostContext);

  if (!data) {
    throw Error('usePostContext should be used inside of PostProvider');
  }

  return data;
};
