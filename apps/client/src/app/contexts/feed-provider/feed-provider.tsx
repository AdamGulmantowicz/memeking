import React, { useContext } from 'react';
import { useAuthContext } from '../auth-provider/auth-provider';
import { IFeedContext } from './feed-provider.interface';
import { usePostContext } from '../post-provider/post-provider';
import { useGroupContext } from '../group-provider/group-provider';

/* eslint-disable-next-line */
export interface IFeedProviderProps {
  children: React.ReactNode;
}

export const FeedContext = React.createContext<IFeedContext | null>(null);

export function FeedProvider({ children }: IFeedProviderProps) {
  const { user } = useAuthContext();
  const {
    fullPostsList,
    userPostsList,
    isFollowingLoading: isLoading,
  } = usePostContext();
  const { groupListResult } = useGroupContext();

  const followingPostsList =
    fullPostsList &&
    fullPostsList?.filter((post) => user?.followers.includes(post.author_id));

  const feedPostsList = followingPostsList &&
    userPostsList && [...followingPostsList, ...userPostsList];

  // const feedPostsList =
  //   combinedPostLists &&
  //   combinedPostLists?.sort(
  //     (a, b) => new Date(a.created) - new Date(b.created)
  //   );

  return (
    <FeedContext.Provider
      value={{
        isLoading,
        groupListResult,
        feedPostsList,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeedContext = () => {
  const data = useContext(FeedContext);

  if (!data) {
    throw Error('useFeedContext should be used inside of FeedProvider');
  }

  return data;
};
