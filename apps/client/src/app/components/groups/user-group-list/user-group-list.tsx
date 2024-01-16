import { SimpleGrid, ScrollArea } from '@mantine/core';
import {
  GroupProvider,
  useGroupContext,
} from '../../../contexts/group-provider/group-provider';
import LoaderComponent from '../../loader/loader';
import GroupCard from '../group-card/group-card';

export function UserGroupList() {
  const { groupListResult, isLoading } = useGroupContext();

  return (
    <LoaderComponent isLoading={isLoading}>
      <ScrollArea mah={800} type="hover">
        <SimpleGrid
          px={20}
          cols={3}
          breakpoints={[
            { minWidth: 'xl', cols: 3, spacing: 'sm' },
            { minWidth: 'lg', cols: 2, spacing: 'sm' },
            { minWidth: 'md', cols: 1, spacing: 'sm' },
          ]}
        >
          {groupListResult?.map((group) => (
            <GroupProvider key={group.id} parentId={group.id}>
              <GroupCard group={group} />
            </GroupProvider>
          ))}
        </SimpleGrid>
      </ScrollArea>
    </LoaderComponent>
  );
}

export default UserGroupList;
