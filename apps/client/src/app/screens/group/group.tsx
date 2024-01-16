import { Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import GroupContent from '../../components/groups/group-content/group-content';
import GroupHeader from '../../components/groups/group-header/group-header';
import { GroupWindowProvider } from '../../contexts/group-window-provider/group-window-provider';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';

/* eslint-disable-next-line */
export interface IGroupProps {}

export function Group(props: IGroupProps) {
  const { groupId } = useParams();
  const { user } = useAuthContext();
  if (groupId === undefined) return null;
  if (!user) return null;
  return (
    <GroupWindowProvider groupId={groupId}>
      <Stack align="stretch">
        <GroupHeader user={user} groupId={groupId} />
        <GroupContent />
      </Stack>
    </GroupWindowProvider>
  );
}

export default Group;
