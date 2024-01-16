import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  HoverCard,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { ThumbUp } from 'tabler-icons-react';
import { IPost } from '../../contexts/post-provider/post-provider.interface';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { IComment } from '../../contexts/comment-provider/comment-provider.interface';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface IVoteBarProps {
  onUpvote: (post: IPost) => void;
  post: IPost;
  onCommentsOpen: () => void;
  commentsList: IComment[] | null;
}

export function VoteBar({
  onUpvote,
  post,
  onCommentsOpen,
  commentsList,
}: IVoteBarProps) {
  const { user } = useAuthContext();
  const voteExists = post?.upvote_ids?.length > 0;
  const commentExists = commentsList ? commentsList?.length > 0 : null;
  const voteActive = user ? post?.upvote_ids?.includes(user?.id) : null;
  const upvoteUsers = post?.expand?.upvote_ids?.map((user: IUser) => user);
  const { t } = useTranslation();
  const commentUsers = useMemo(
    () =>
      commentsList?.map(
        (comment: IComment) => comment?.expand?.author_id as IUser
      ),
    [commentsList]
  );

  const filterDuplicateUsers = useCallback((users: IUser[]) => {
    const uniqueRecords = users?.filter(
      (record, index, self) =>
        self.findIndex((r) => r.id === record.id) === index
    );

    return uniqueRecords;
  }, []);

  const filteredUserList = useMemo(
    () => filterDuplicateUsers(commentUsers as IUser[]),
    [commentUsers, filterDuplicateUsers]
  );
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={15}>
        {voteExists && (
          <Group align="left">
            <Divider />
            <HoverCard>
              <HoverCard.Target>
                <UnstyledButton>
                  <Flex>
                    <ThumbUp />
                    <Text> {post?.upvote_ids.length}</Text>
                  </Flex>
                </UnstyledButton>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                {upvoteUsers?.map((user: IUser) => (
                  <Text key={user.id}>{user.name}</Text>
                ))}
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        )}
        {commentExists && (
          <Group align="right">
            <HoverCard>
              <HoverCard.Target>
                <UnstyledButton onClick={() => onCommentsOpen()}>
                  {commentsList
                    ? commentsList?.length > 1
                      ? `${commentsList?.length} ${t('posts.comments')}`
                      : `${commentsList?.length} ${t('posts.comment')}`
                    : ''}
                </UnstyledButton>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                {filteredUserList?.map((user) => (
                  <Text key={user.id}>{user.name}</Text>
                ))}
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        )}
      </Flex>
      <Divider mb={10} />
      <Flex justify="space-between">
        <Button
          px={50}
          color={voteActive ? 'blue' : 'gray'}
          onClick={() => onUpvote(post)}
        >
          <ThumbUp />
        </Button>
      </Flex>
    </Box>
  );
}

export default VoteBar;
