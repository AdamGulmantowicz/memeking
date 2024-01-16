import styles from './user-list-item-card.module.css';
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { ChevronDown, LineDashed, X } from 'tabler-icons-react';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
import { useTranslation } from 'react-i18next';
import { usePostContext } from '../../contexts/post-provider/post-provider';

export interface IUserListItemCardProps {
  user: IUser;
  values?: string[];
  itemActive: boolean;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  handleItemClick?: (value: string) => void;
}

function UserListItemCard({
  user,
  values,
  onAddUser,
  onRemoveUser,
  isLoading,
  handleItemClick,
}: IUserListItemCardProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const { fullPostsList } = usePostContext();

  const usersPosts = fullPostsList?.filter(
    (post) => post.author_id === user?.id
  );

  return (
    <Card withBorder padding="lg" radius="md">
      <Card.Section
        h={140}
        style={{
          background: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage:
            user?.avatar &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            `url(${import.meta.env.VITE_FILES_URL}/users/${user?.id}/${
              user?.backgroundImage
            })`,
        }}
      />
      <Avatar
        src={
          user?.avatar && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          `${import.meta.env.VITE_FILES_URL}/users/${user?.id}/${user?.avatar}`
        }
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {user?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user?.aboutText ? user?.aboutText : <LineDashed size={10} />}
      </Text>
      <Flex mt="md" align="center" wrap="nowrap" justify="center" gap={15}>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.following')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            {user?.followers.length}
          </Text>
        </div>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.memes')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            0
          </Text>
        </div>
        <div>
          <Text ta="center" fz="md" fw={500}>
            {t('profile.posts')}:
          </Text>
          <Text ta="center" fz="sm" c="dimmed" lh={2}>
            {usersPosts?.length}
          </Text>
        </div>
      </Flex>

      <Group spacing={0} mt="xl" position="center">
        <Button
          variant="default"
          className={styles.button}
          color="gray"
          onClick={() => (handleItemClick ? handleItemClick(user?.id) : null)}
        >
          {t('profile.sendMessage')}
        </Button>
        <Menu
          transitionProps={{ transition: 'pop' }}
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <ActionIcon
              variant="default"
              color={'gray'}
              size={36}
              className={styles.menuControl}
            >
              <ChevronDown style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={
                <X
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[5]}
                />
              }
              onClick={() => onRemoveUser(user?.id)}
            >
              {t('profile.unfollow')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
}

export default UserListItemCard;
