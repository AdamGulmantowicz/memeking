import FollowingList from '../../components/following-list/following-list';
import AuthLoader from '../../components/auth-loader/auth-loader';
import { Stack } from '@mantine/core';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';

export function Sidebar() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div>
      <AuthLoader>
        <Stack align="stretch">{isLoggedIn && <FollowingList />}</Stack>
      </AuthLoader>
    </div>
  );
}

export default Sidebar;
