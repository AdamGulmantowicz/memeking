import React, { useCallback, useContext, useEffect } from 'react';
import { useGroup, usePost, usePostList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { pb } from '../../utils/pocketbase';
import { IGroupWindowContext } from './group-window-provider.interface';
import { FileWithPath } from '@mantine/dropzone';

/* eslint-disable-next-line */
export interface IGroupProviderProps {
  children: React.ReactNode;
  groupId?: string;
}

export const GroupWindowContext =
  React.createContext<IGroupWindowContext | null>(null);

export function GroupWindowProvider({
  children,
  groupId,
}: IGroupProviderProps) {
  const { user } = useAuthContext();

  const {
    deleteOne,
    updateOne,
    getOne,
    data: groupResult,
    loading: isLoading,
  } = useGroup(groupId);

  const {
    getList: getPostList,
    result: groupPostsListResult,
    loading: isPostsLoading,
  } = usePostList();

  const { createOne: createOnePost } = usePost();

  const loadGroup = useCallback(() => {
    getOne({
      queryParams: {
        sort: 'created',
        expand: 'users',
      },
    });
  }, [getOne]);

  useEffect(() => {
    loadGroup();
  }, [loadGroup]);

  useEffect(() => {
    pb.collection('groups').subscribe('*', async (e) => {
      loadGroup();
    });
  }, [loadGroup, groupResult]);

  const loadGroupPosts = useCallback(() => {
    getPostList({
      queryParams: {
        sort: 'created',
        expand: 'author_id,users',
        filter: `group_id~"${groupId}"`,
      },
    });
  }, [getPostList, groupId]);

  useEffect(() => {
    loadGroupPosts();
  }, [loadGroupPosts]);

  useEffect(() => {
    pb.collection('posts').subscribe('*', async (e) => {
      loadGroupPosts();
    });
  }, [loadGroupPosts, groupPostsListResult]);

  const joinGroup = (users: string[]) => {
    if (!users || !user) return;
    updateOne({
      users: [...users, user?.id],
    });
  };

  const leaveGroup = () => {
    updateOne({
      users: groupResult?.users.filter(
        (groupUser: string) => groupUser !== user?.id
      ),
    });
  };
  const deleteGroup = (id: string) => {
    deleteOne(id);
    loadGroup();
  };
  const createGroupPost = (contentText: string, groupId: string) => {
    createOnePost({
      author_id: user?.id,
      contentText: contentText,
      group_id: groupId,
    });
  };
  const updateGroupDescription = (aboutText: string) => {
    updateOne({
      aboutText: aboutText,
    });
  };

  //  TODO ADD IMAGE UPLOAD

  const updateGroupImage = (image: FileWithPath[]) => {
    updateOne(
      {
        avatar: image[0],
      },
      groupId
    );
  };

  return (
    <GroupWindowContext.Provider
      value={{
        isLoading,
        groupResult,
        joinGroup,
        leaveGroup,
        deleteGroup,
        groupPostsListResult,
        isPostsLoading,
        createGroupPost,
        updateGroupImage,
        updateGroupDescription,
      }}
    >
      {children}
    </GroupWindowContext.Provider>
  );
}

export const useGroupWindowContext = () => {
  const data = useContext(GroupWindowContext);

  if (!data) {
    throw Error(
      'useGroupWindowContext should be used inside of GroupWindowProvider'
    );
  }

  return data;
};
