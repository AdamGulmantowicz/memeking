import { Stack, Container } from '@mantine/core';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { usePostContext } from '../../contexts/post-provider/post-provider';
import ProfileHeader from '../../components/profile/profile-header/profile-header';
import ProfileTabs from '../../components/profile/profile-tabs/profile-tabs';
import LoaderComponent from '../../components/loader/loader';

export function Profile() {
  const { user, isLoading, updateUserAvatar, updateUserBackground } =
    useAuthContext();
  const { userPostsList } = usePostContext();

  if (!user) return;
  return (
    <Container>
      <Stack align="stretch" maw={1000}>
        <LoaderComponent isLoading={isLoading}>
          <>
            <ProfileHeader
              user={user}
              userPostsList={userPostsList}
              onAvatarSubmit={updateUserAvatar}
              onBackgroundSubmit={updateUserBackground}
            />
            {userPostsList && (
              <ProfileTabs user={user} userPostsList={userPostsList} />
            )}
          </>
        </LoaderComponent>
      </Stack>
    </Container>
  );
}

export default Profile;
