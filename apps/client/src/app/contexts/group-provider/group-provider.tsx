import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useGroup, useGroupList } from '../../hooks/pb-utils';
import { useAuthContext } from '../auth-provider/auth-provider';
import { pb } from '../../utils/pocketbase';
import { IGroupContext } from './group-provider.interface';

/* eslint-disable-next-line */
export interface IGroupProviderProps {
  children: React.ReactNode;
  parentId?: string;
}

export const GroupContext = React.createContext<IGroupContext | null>(null);

export function GroupProvider({ children, parentId }: IGroupProviderProps) {
  const { user } = useAuthContext();
  const {
    getList,
    result: groupListResult,
    loading: isLoading,
  } = useGroupList();
  const {
    getList: getGroupSearchList,
    result: groupSearchListResult,
    loading: isGroupSearchLoading,
  } = useGroupList();

  const { createOne, deleteOne, updateOne } = useGroup();
  const [isSearching, setIsSearching] = useState(false);
  const loadGroups = useCallback(() => {
    getList({
      queryParams: {
        sort: 'created',
        expand: 'author_id,upvote_ids',
        filter: `users~"${user?.id}"`,
      },
    });
  }, [getList, user]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  useEffect(() => {
    pb.collection('groups').subscribe('*', async (e) => {
      loadGroups();
    });
  }, [loadGroups, groupListResult]);

  const createGroup = (title: string, users: string[]) => {
    if (title && users && user)
      createOne({
        author_id: user?.id,
        users: [...users, user?.id],
        title: title,
      });
  };
  const searchGroup = useCallback(
    (value: string) => {
      if (value.length >= 3) {
        setIsSearching(true);
        getGroupSearchList({
          queryParams: { filter: `title~"${value}"` },
        });
      } else setIsSearching(false);
    },
    [getGroupSearchList]
  );
  const joinGroup = (users: string[], groupId: string) => {
    if (!users || !user) return;
    updateOne(
      {
        users: [...users, user?.id],
      },
      groupId
    );
  };

  const leaveGroup = (groupId: string, users: string[]) => {
    updateOne(
      {
        users: users.filter((groupUser: string) => groupUser !== user?.id),
      },
      groupId
    );
  };
  const deleteGroup = (id: string) => {
    deleteOne(id);
    loadGroups();
  };

  return (
    <GroupContext.Provider
      value={{
        isLoading,
        groupListResult,
        groupSearchListResult,
        createGroup,
        searchGroup,
        joinGroup,
        leaveGroup,
        deleteGroup,
        isGroupSearchLoading,
        isSearching,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export const useGroupContext = () => {
  const data = useContext(GroupContext);

  if (!data) {
    throw Error('useGroupContext should be used inside of GroupProvider');
  }

  return data;
};
