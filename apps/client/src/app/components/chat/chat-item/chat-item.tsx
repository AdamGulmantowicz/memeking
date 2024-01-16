import { Flex, Avatar, Text, Menu } from '@mantine/core';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useMemo } from 'react';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';

export interface IChatItemProps {
  avatar: string;
  id: string;
  expand: IUser[];
}

export function ChatItem({ avatar, id, expand }: IChatItemProps) {
  const { user } = useAuthContext();
  const { handleOpenChatToggle } = useChatContext();

  const chatUsers = useMemo(
    () =>
      expand
        ?.map(
          (user: IUser) =>
            user.name.charAt(0).toUpperCase() + user.name.slice(1)
        )
        .join(', '),
    [expand]
  );

  const chatAvatar = expand.filter((chatUser) => chatUser?.id !== user?.id)[0];

  return (
    <Menu.Item onClick={() => handleOpenChatToggle(id)}>
      <Flex align="center">
        <Avatar
          size="md"
          radius={100}
          src={
            chatAvatar?.avatar &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            `${import.meta.env.VITE_FILES_URL}/users/${chatAvatar?.id}/${
              chatAvatar?.avatar
            }`
          }
        />
        <Flex ml={15} direction="column">
          <Text maw={150} truncate="end" fw={500}>
            {chatUsers}
          </Text>
        </Flex>
      </Flex>
    </Menu.Item>
  );
}

export default ChatItem;
