import { ScrollArea, Stack } from '@mantine/core';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import GroupSearchListItem from '../group-search-list-item/group-search-list-item';
import LoaderComponent from '../../loader/loader';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export function GroupSearchList() {
  const { groupSearchListResult, isGroupSearchLoading, isSearching } =
    useGroupContext();
  const { groupId } = useParams();

  const notJoinedGroups = useMemo(
    () => groupSearchListResult?.filter((group) => group?.id === groupId),
    [groupId, groupSearchListResult]
  );

  return (
    <LoaderComponent isLoading={isGroupSearchLoading}>
      <Stack align="stretch">
        <ScrollArea>
          {isSearching &&
            notJoinedGroups?.map((group) => (
              <GroupSearchListItem key={group.id} group={group} />
            ))}
        </ScrollArea>
      </Stack>
    </LoaderComponent>
  );
}

export default GroupSearchList;
