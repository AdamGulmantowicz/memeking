import { Flex, ScrollArea } from '@mantine/core';
import UserSearch from '../user-search/user-search';
import UserList from '../user-list/user-list';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';
import UserListItemInline from '../user-list-item-inline/user-list-item-inline';
import LoaderComponent from '../loader/loader';

export function FollowersSearch() {
  const {
    handleSearch,
    followersSearchList,
    followingList,
    handleAddFollowing,
    handleRemoveFollowing,
    isLoading,
  } = useChatContext();

  return (
    <Flex>
      <UserSearch handleSearch={handleSearch}>
        <LoaderComponent isLoading={isLoading}>
          <ScrollArea type="hover">
            <UserList
              listItem={(item, values) => (
                <UserListItemInline
                  user={item}
                  values={values}
                  onAddUser={handleAddFollowing}
                  onRemoveUser={handleRemoveFollowing}
                  itemActive={false}
                  isLoading={isLoading}
                />
              )}
              userList={followersSearchList}
              currentList={followingList}
              isLoading={isLoading}
              hideExisting={false}
            />
          </ScrollArea>
        </LoaderComponent>
      </UserSearch>
    </Flex>
  );
}

export default FollowersSearch;
