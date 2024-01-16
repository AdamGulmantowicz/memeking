import {
  Avatar,
  Button,
  Title,
  Menu,
  useMantineTheme,
  rem,
} from '@mantine/core';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';
import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { IUser } from '../../contexts/auth-provider/auth-provider.interface';
import { useCallback } from 'react';
import { CirclePlus, Dots, Loader, X } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';

export interface IUserListItemInlineProps {
  user: IUser;
  values?: string[];
  itemActive: boolean;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  isLoading: boolean;
  onItemClick?: (value: string) => void;
}

function UserListItemInline({
  user,
  values,
  onAddUser,
  onRemoveUser,
  isLoading,
  onItemClick,
}: IUserListItemInlineProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const handleValues = useCallback(() => {
    if (values?.includes(user.id)) {
      onRemoveUser(user.id);
    } else {
      onAddUser(user.id);
    }
  }, [onAddUser, onRemoveUser, user, values]);
  return (
    <Button.Group mb={5}>
      <Button
        styles={(theme) => ({
          root: {
            display: 'flex',
          },
        })}
        fullWidth
        color="gray"
        leftIcon={
          <Avatar
            radius={100}
            size="md"
            src={
              user?.avatar && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              `${import.meta.env.VITE_FILES_URL}/users/${user?.id}/${
                user?.avatar
              }`
            }
          />
        }
        size="md"
        variant="subtle"
        onClick={() => (onItemClick ? onItemClick(user.id) : null)}
      >
        <Title size={14} weight={500}>
          {user.name}
        </Title>
      </Button>
      {isLoading ? (
        <Loader size={'sm'} />
      ) : values?.includes(user.id) ? (
        <Menu variant="subtle">
          <Menu.Target>
            <Button size="md" variant="subtle" color="gray">
              <Dots />
            </Button>
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
      ) : (
        <Button variant="subtle" color="gray" size="md" onClick={handleValues}>
          <CirclePlus stroke="green" />
        </Button>
      )}
    </Button.Group>
  );
}

export default UserListItemInline;
