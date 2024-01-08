import {
  Group,
  Flex,
  Avatar,
  Title,
  Text,
  Tabs,
  TextInput,
  Button,
  SimpleGrid,
  Stack,
  Container,
  PasswordInput,
} from '@mantine/core';
import { Photo, MessageCircle, Settings, Friends } from 'tabler-icons-react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import UserList from '../../components/user-list/user-list';
import UserListItemCard from '../../components/user-list-item-card/user-list-item-card';
import PostList from '../../components/posts/post-list/post-list';
import { usePostContext } from '../../contexts/post-provider/post-provider';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateData } from '../../utils/navigate';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function Profile() {
  const { user } = useAuthContext();
  const {
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    userChatsList,
    createChatWithUser,
    handleOpenChatToggle,
    isLoading,
  } = useChatContext();
  const { userPostsList } = usePostContext();
  const { profileTab } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleItemClick = useCallback(
    (id: string) => {
      //  Function compares chats users ids with current chat users ids, if true it opens matching chat, if not creates new chat with provided user
      const currentUsers = [user?.id, id];
      const matchingChat = userChatsList?.find(
        (chat) =>
          chat?.users?.length === currentUsers.length &&
          chat.users.every((userId) => currentUsers?.includes(userId))
      );
      if (!matchingChat) {
        createChatWithUser(id);
        return;
      }
      const chatExists = matchingChat?.users?.includes(id);
      if (chatExists) handleOpenChatToggle(matchingChat?.id);
    },
    [createChatWithUser, handleOpenChatToggle, user, userChatsList]
  );

  return (
    <Container>
      <Stack align="stretch" maw={1000}>
        <div>
          <Group position="left" mb="xl">
            <Avatar size="xl" />
            <Flex direction="column">
              <Title>{user?.name}</Title>
              <Group>
                <Group>
                  <Text> {t('profile.memes')}:</Text>
                  <Text>25</Text>
                </Group>
                <Group>
                  <Text> {t('profile.posts')}:</Text>
                  <Text>{userPostsList?.length}</Text>
                </Group>
                <Group>
                  <Text> {t('profile.followers')}:</Text>
                  <Text>{user?.followers.length}</Text>
                </Group>
              </Group>
            </Flex>
          </Group>
        </div>
        <Tabs defaultValue="memes" value={profileTab}>
          <Tabs.List>
            <Tabs.Tab
              value="memes"
              icon={<Photo size="0.8rem" />}
              onClick={() => navigate(navigateData.profileMemes)}
            >
              {t('profile.memes')}
            </Tabs.Tab>

            <Tabs.Tab
              value="posts"
              icon={<MessageCircle size="0.8rem" />}
              onClick={() => navigate(navigateData.profilePosts)}
            >
              {t('profile.posts')}
            </Tabs.Tab>
            <Tabs.Tab
              value="following"
              icon={<Friends size="0.8rem" />}
              onClick={() => navigate(navigateData.profileFollowing)}
            >
              {t('profile.following')}
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              icon={<Settings size="0.8rem" />}
              onClick={() => navigate(navigateData.profileSettings)}
            >
              {t('profile.settings')}
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="memes" pt="xs">
            Gallery tab content
          </Tabs.Panel>
          <Tabs.Panel value="posts" pt="xs">
            <PostList postList={userPostsList} isLoading={isLoading} />
          </Tabs.Panel>
          <Tabs.Panel value="following" pt="xs">
            <SimpleGrid cols={3}>
              <UserList
                listItem={(item, values) => (
                  <UserListItemCard
                    user={item}
                    values={values}
                    onAddUser={handleAddFollowing}
                    onRemoveUser={handleRemoveFollowing}
                    handleItemClick={handleItemClick}
                    itemActive={false}
                    isLoading={isLoading}
                  />
                )}
                userList={followingList}
                currentList={followingList}
                isLoading={isLoading}
                hideExisting={false}
              />
            </SimpleGrid>
          </Tabs.Panel>
          <Tabs.Panel value="settings" pt="xs">
            <TextInput disabled placeholder={user?.name} label="Full name" />
            <PasswordInput disabled label="Password" />
            <TextInput disabled placeholder={user?.email} label="Email" />
            <Button mt={20}>Edit</Button>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default Profile;
