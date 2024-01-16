import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import AuthLoader from '../../components/auth-loader/auth-loader';
import ChatList from '../../components/chat/chat-list/chat-list';
import LanguageMenu from '../../components/language-menu/language-menu';
import ProfileMenu from '../../components/profile-menu/profile-menu';

export function Header() {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Button variant="transparent" onClick={() => navigate('/')}>
        <Text>
          Meme
          <span role="img" aria-label="crown emoji">
            &#128081;
          </span>
          King
        </Text>
      </Button>

      <Group position="right">
        <AuthLoader>
          <Group>
            {isLoggedIn && <ChatList />}

            {!isLoggedIn && (
              <Button
                size="xs"
                variant="default"
                onClick={() => navigate('/signin')}
              >
                {t('header.signin')}
              </Button>
            )}
            {!isLoggedIn && (
              <Button size="xs" onClick={() => navigate('/signup')}>
                {t('header.signup')}
              </Button>
            )}

            {isLoggedIn && <ProfileMenu />}
          </Group>
        </AuthLoader>
        <Group position="right">
          <LanguageMenu />
        </Group>
      </Group>
    </>
  );
}

export default Header;
