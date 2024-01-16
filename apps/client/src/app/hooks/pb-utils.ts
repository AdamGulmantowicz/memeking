import { useState, useEffect, useMemo, useCallback } from 'react';
import { pb } from '../utils/pocketbase';
import { ListResult, Record, RecordService } from 'pocketbase';
import { IUser } from '../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../contexts/post-provider/post-provider.interface';
import { IComment } from '../contexts/comment-provider/comment-provider.interface';
import { IGroup } from '../contexts/group-provider/group-provider.interface';

const createPbCollection = (collectionName: string) =>
  pb.collection(collectionName);
pb.autoCancellation(false);

const gameCollection = createPbCollection('game');
const userCollection = createPbCollection('users');
const roundCollection = createPbCollection('round');
const memeCollection = createPbCollection('meme');
const chatCollection = createPbCollection('chats');
const messageCollection = createPbCollection('messages');
const postCollection = createPbCollection('posts');
const commentCollection = createPbCollection('comments');
const groupCollection = createPbCollection('groups');

export const createSearchHook = <T extends Record>(
  collection: RecordService
) => {
  return () => {
    const [data, setData] = useState<ListResult<T> | T[] | null>(null);
    const [result, setResult] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);

    const items = useMemo(
      () => (Array.isArray(data) ? data : data?.items || []),
      [data]
    );

    const getList = useCallback(
      async ({ page = 1, perPage = 10, queryParams = {} }) => {
        setLoading(true);
        const result = await collection.getList<T>(page, perPage, queryParams);
        setData(result);
        setResult(result.items);
        setLoading(false);
      },
      []
    );

    const getFullList = useCallback(async (queryParams = {}) => {
      setLoading(true);
      const result = await collection.getFullList<T>(queryParams);
      setData(result);
      setResult(result);
      setLoading(false);
    }, []);

    return useMemo(
      () => ({
        data,
        result,
        loading,
        items,
        getList,
        getFullList,
      }),
      [data, getFullList, getList, items, loading, result]
    );
  };
};

export const createCRUDHook = <T extends Record>(collection: RecordService) => {
  return (id?: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);

    const getOne = useCallback(
      async (query = {}, overrideId?: string) => {
        if (!id && !overrideId) throw new Error('No id provided');
        setLoading(true);

        const result = (await collection.getOne(
          (overrideId ? overrideId : id) as string,
          query
        )) as T;
        setData(result);
        setLoading(false);
      },
      [id]
    );

    const createOne = useCallback(async (data: Partial<T>) => {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key] as string | Blob);
      }

      setLoading(true);
      const result = (await collection.create(formData)) as T;
      setData(result);
      setLoading(false);
    }, []);

    const updateOne = useCallback(
      async (data: Partial<T>, overrideId?: string) => {
        if (!id && !overrideId) {
          throw new Error('No id provided');
        }
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key] as string | Blob);
        }
        setLoading(true);
        const result = (await collection.update(
          (overrideId ? overrideId : id) as string,
          formData
        )) as T;
        setData(result);
        setLoading(false);
      },
      [id]
    );

    const deleteOne = useCallback(
      async (overrideId?: string) => {
        if (!id && !overrideId) throw new Error('No id provided');
        setLoading(true);
        await collection.delete((overrideId ? overrideId : id) as string);
        setData(null);
        setLoading(false);
      },
      [id]
    );

    return { data, loading, getOne, createOne, updateOne, deleteOne };
  };
};

const createSubscriptionHook = <T extends Record>(
  collection: RecordService
) => {
  return (id?: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    const unsubscribe = useCallback(async () => {
      setLoading(true);
      await collection.unsubscribe(id);
      setData(null);
      setLoading(false);
    }, [id]);

    useEffect(() => {
      if (!id) return;
      collection.subscribe(id, (e) => {
        setData(e.record as T);
      });

      return () => {
        unsubscribe();
      };
    }, [id, unsubscribe]);

    return { data, loading, unsubscribe };
  };
};

export const useGame = createCRUDHook(gameCollection);
export const useUser = createCRUDHook<IUser>(userCollection);
export const useRound = createCRUDHook(roundCollection);
export const useMeme = createCRUDHook(memeCollection);
export const useChat = createCRUDHook(chatCollection);
export const useMessage = createCRUDHook(messageCollection);
export const usePost = createCRUDHook(postCollection);
export const useComment = createCRUDHook(commentCollection);
export const useGroup = createCRUDHook<IGroup>(groupCollection);

export const useGameList = createSearchHook(gameCollection);
export const useUserList = createSearchHook(userCollection);
export const useRoundList = createSearchHook(roundCollection);
export const useMemeList = createSearchHook(memeCollection);
export const useChatList = createSearchHook(chatCollection);
export const useMessageList = createSearchHook(messageCollection);
export const usePostList = createSearchHook<IPost>(postCollection);
export const useCommentList = createSearchHook<IComment>(commentCollection);
export const useGroupList = createSearchHook<IGroup>(groupCollection);

export const useGameSubscription = createSubscriptionHook(gameCollection);
export const useUserSubscription = createSubscriptionHook(userCollection);
export const useRoundSubscription = createSubscriptionHook(roundCollection);
export const useMemeSubscription = createSubscriptionHook(memeCollection);
export const useChatSubscription = createSubscriptionHook(chatCollection);
export const useMessageSubscription = createSubscriptionHook(messageCollection);
export const usePostSubscription = createSubscriptionHook(postCollection);
export const useCommentSubscription = createSubscriptionHook(commentCollection);
export const useGroupSubscription = createSubscriptionHook(groupCollection);
