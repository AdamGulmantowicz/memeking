import { Button, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useState, useEffect } from 'react';
/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { isLoggedIn } = useAuthContext();
  const [visible, setVisible] = useState(isLoggedIn);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <Group>
        <Text>
          Meme
          <span role="img" aria-label="crown emoji">
            &#128081;
          </span>
          King
        </Text>
      </Group>

      <Group position="right">
        {/* TODO add account menu when loggedIn */}
        {!visible && (
          <Button
            size="xs"
            variant="default"
            onClick={() => navigate('/signin')}
          >
            Log in
          </Button>
        )}
        {!visible && (
          <Button size="xs" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        )}
        {visible && (
          <Button
            size="xs"
            onClick={() =>
              function () {
                logout();
                navigate('/');
              }
            }
          >
            Sign Out
          </Button>
        )}
      </Group>
    </>
  );
}

export default Header;
