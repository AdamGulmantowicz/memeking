import { Avatar, Flex, Group, Paper, Text } from '@mantine/core';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';

/* eslint-disable-next-line */
export interface CommentItemProps {
  children: React.ReactNode;
  author: IUser;
}

export function CommentItem({ children, author }: CommentItemProps) {
  // TODO ADD COMMENT UPVOTE

  return (
    <Group>
      <Paper p={5} bg={'gray'} my={5} radius={25}>
        <Flex align="center">
          <Avatar size="lg" radius={100} mr={10} />
          <Text mr={10}>{children}</Text>
        </Flex>
      </Paper>
    </Group>
  );
}

export default CommentItem;
