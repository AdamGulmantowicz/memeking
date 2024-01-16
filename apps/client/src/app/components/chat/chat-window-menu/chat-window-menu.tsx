import { Group, UnstyledButton, Avatar, Title, Menu } from '@mantine/core';
import { DoorExit } from 'tabler-icons-react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
interface IChatWindowMenuProps {
  user: IUser | null;
  chatAvatar: IUser;
  chatId: string;
  currentChatUsers: IUser[];
  currentChatUsersIds: string[];
  onLeaveChat: (chatId: string, currentChatUsersIds: string[]) => void;
}
function ChatWindowMenu({
  user,
  chatAvatar,
  chatId,
  currentChatUsers,
  currentChatUsersIds,
  onLeaveChat,
}: IChatWindowMenuProps) {
  const { t } = useTranslation();

  const chatUserNames = useMemo(
    () =>
      currentChatUsers
        ?.map((user) => user.name)
        ?.filter((chatUser: string) => chatUser !== user?.name)
        .join(', '),
    [currentChatUsers, user]
  );

  const handleLeaveChat = useCallback(() => {
    onLeaveChat(chatId, currentChatUsersIds);
  }, [chatId, currentChatUsersIds, onLeaveChat]);
  return (
    <Menu shadow="md" width={200} position="right-start" offset={25}>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Avatar
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              src={`${import.meta.env.VITE_FILES_URL}/users/${chatAvatar?.id}/${
                chatAvatar?.avatar
              }`}
              size={45}
              radius="xl"
            />
            <Title color="white" weight={500} size={17} maw={230} truncate>
              {chatUserNames}
            </Title>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={handleLeaveChat} icon={<DoorExit />}>
          {t('chat.leave')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ChatWindowMenu;
