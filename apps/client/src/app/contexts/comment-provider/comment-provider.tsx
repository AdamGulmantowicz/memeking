import React, { useCallback, useContext, useEffect } from 'react';
import { useComment, useCommentList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { ICommentContext } from './comment-provider.interface';
import { pb } from '../../utils/pocketbase';

/* eslint-disable-next-line */
export interface ICommentProviderProps {
  children: React.ReactNode;
  parentId: string;
}

export const CommentContext = React.createContext<ICommentContext | null>(null);

export function CommentProvider({ children, parentId }: ICommentProviderProps) {
  const { user } = useAuthContext();
  const {
    getList,
    result: commentListResult,
    loading: isLoading,
  } = useCommentList();

  const { createOne } = useComment();

  const loadComments = useCallback(() => {
    getList({
      queryParams: {
        sort: 'created',
        expand: 'author_id,upvote_ids',
        filter: `post_id~"${parentId}"`,
      },
    });
  }, [parentId, getList]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    pb.collection('comments').subscribe('*', async (e) => {
      loadComments();
    });
  }, [loadComments, commentListResult]);

  const createComment = (contentText: string) => {
    if (parentId && contentText)
      createOne({
        author_id: user?.id,
        post_id: parentId,
        contentText: contentText,
      });
  };

  //  TODO ADD UPDATE AND DELETE FUNCTIONALITY

  return (
    <CommentContext.Provider
      value={{
        isLoading,
        commentListResult,
        createComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export const useCommentContext = () => {
  const data = useContext(CommentContext);

  if (!data) {
    throw Error('useCommentContext should be used inside of CommentProvider');
  }

  return data;
};
