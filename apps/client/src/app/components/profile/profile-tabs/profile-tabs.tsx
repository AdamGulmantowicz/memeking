import { ScrollArea, SimpleGrid, Tabs, Text } from '@mantine/core';
import PostList from '../../posts/post-list/post-list';
import UserList from '../../user-list/user-list';
import UserListItemCard from '../../user-list-item-card/user-list-item-card';
import { Friends, MessageCircle, Photo, Settings } from 'tabler-icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navigateData } from '../../../utils/navigate';
import { useCallback } from 'react';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import ProfileSettings from '../profile-settings/profile-settings';

export interface ProfileTabsProps {
  user: IUser;
  userPostsList: IPost[];
}

export function ProfileTabs({ user, userPostsList }: ProfileTabsProps) {
  const { profileTab } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    userChatsList,
    createChatWithUser,
    handleOpenChatToggle,
    isLoading,
  } = useChatContext();
  // const currentUsersPostsList = userPostsList?.filter(
  //   (post) => post?.author_Id === user?.id
  // );
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
        <Text>""</Text>
      </Tabs.Panel>
      <Tabs.Panel value="posts" pt="xs">
        <PostList postList={userPostsList} isLoading={isLoading} />
      </Tabs.Panel>
      <Tabs.Panel value="following" pt="xs">
        <ScrollArea>
          <SimpleGrid cols={3} variant="hover">
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
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value="settings" pt="xs">
        <ProfileSettings user={user} />
      </Tabs.Panel>
    </Tabs>
  );
}

export default ProfileTabs;
