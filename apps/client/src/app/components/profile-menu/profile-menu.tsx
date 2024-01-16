import { Title, clsx } from '@mantine/core';
import {
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
  rem,
} from '@mantine/core';
import styles from './profile-menu.module.css';
import {
  ChevronDown,
  LayoutCollage,
  Logout,
  Message,
  Settings,
} from 'tabler-icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';

export function ProfileMenu() {
  const { user } = useAuthContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { t } = useTranslation();

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={clsx(styles.user, {
            [styles.userActive]: userMenuOpened,
          })}
        >
          <Group spacing={7}>
            <Avatar
              src={
                user?.avatar &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                `${import.meta.env.VITE_FILES_URL}/users/${user?.id}/${
                  user?.avatar
                }`
              }
              alt={'User profile icon'}
              radius={100}
              size="md"
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user?.name}
            </Text>
            <ChevronDown style={{ width: rem(12), height: rem(12) }} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={
            <Avatar
              radius={100}
              src={
                user?.avatar &&
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                `${import.meta.env.VITE_FILES_URL}/users/${user?.id}/${
                  user?.avatar
                }`
              }
            />
          }
          onClick={() => navigate('/profile')}
        >
          <Title order={4}>{user?.name}</Title>
        </Menu.Item>
        <Menu.Item
          icon={
            <LayoutCollage
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
            />
          }
          onClick={() => navigate('/profile/memes')}
        >
          {t('profileMenu.yourMemes')}
        </Menu.Item>
        <Menu.Item
          icon={
            <Message
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
            />
          }
          onClick={() => navigate('/profile/posts')}
        >
          {t('profileMenu.yourPosts')}
        </Menu.Item>

        <Menu.Label> {t('profileMenu.settings')}</Menu.Label>
        <Menu.Item
          icon={<Settings style={{ width: rem(16), height: rem(16) }} />}
          onClick={() => navigate('/profile/settings')}
        >
          {t('profileMenu.accSettings')}
        </Menu.Item>

        <Menu.Item
          icon={<Logout style={{ width: rem(16), height: rem(16) }} />}
          onClick={() => logout()}
        >
          {t('profileMenu.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
