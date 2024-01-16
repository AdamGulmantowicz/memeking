import {
  Badge,
  Button,
  Collapse,
  Group,
  ScrollArea,
  Stack,
  Title,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import LoaderComponent from '../loader/loader';
import { useTranslation } from 'react-i18next';
import UserList from '../user-list/user-list';
import UserListItemInline from '../user-list-item-inline/user-list-item-inline';
import { Search } from 'tabler-icons-react';
import FollowersSearch from '../followers-search/followers-search';

export function FollowingList() {
  const { user } = useAuthContext();
  const {
    isLoading,
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    userChatsList,
    createChatWithUser,
    followersSearchList,
    handleOpenChatToggle,
  } = useChatContext();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <Group position="apart">
        <Group>
          <Badge size="xs" variant="filled" color="blue" w={16} h={16} p={1}>
            {user?.followers.length}
          </Badge>
          <Title order={4}>{t('following.following')}</Title>
        </Group>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="sublte"
          radius={100}
          leftIcon={<Search size={20} />}
        />
      </Group>
      <LoaderComponent isLoading={isLoading}>
        <Stack align="stretch">
          <Collapse in={isOpen}>
            <FollowersSearch />
          </Collapse>
          {followersSearchList.length > 0 ? null : (
            <ScrollArea type="hover">
              <UserList
                listItem={(item, values) => (
                  <UserListItemInline
                    user={item}
                    values={values}
                    onAddUser={handleAddFollowing}
                    onRemoveUser={handleRemoveFollowing}
                    onItemClick={handleItemClick}
                    itemActive
                    isLoading={isLoading}
                  />
                )}
                userList={followingList}
                currentList={followingList}
                isLoading={isLoading}
                hideExisting={false}
              />
            </ScrollArea>
          )}
        </Stack>
      </LoaderComponent>
    </>
  );
}

export default FollowingList;
