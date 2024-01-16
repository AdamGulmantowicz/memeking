import { ScrollArea, Stack } from '@mantine/core';
import GroupListItem from '../group-list-item/group-list-item';
import LoaderComponent from '../../loader/loader';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { GroupProvider } from '../../../contexts/group-provider/group-provider';

/* eslint-disable-next-line */
export interface GroupListProps {
  groupList: IGroup[] | null;
  onItemClick: (id: string) => void;
  isLoading: boolean;
}

export function GroupList({
  groupList,
  onItemClick,
  isLoading,
}: GroupListProps) {
  return (
    <Stack align="stretch">
      <LoaderComponent isLoading={isLoading}>
        <ScrollArea type="hover" mah={500}>
          {groupList?.map((group) => (
            <GroupProvider key={group.id} parentId={group.id}>
              <GroupListItem
                id={group.id}
                title={group.title}
                onItemClick={onItemClick}
                avatar={group?.avatar}
              />
            </GroupProvider>
          ))}
        </ScrollArea>
      </LoaderComponent>
    </Stack>
  );
}

export default GroupList;
