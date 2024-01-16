import { Paper, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useEffect, useMemo } from 'react';
import { Search } from 'tabler-icons-react';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { useNavigate } from 'react-router-dom';
import GroupList from '../group-list/group-list';
import { navigateData } from '../../../utils/navigate';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
export interface ISearchGroupProps {
  user: IUser;
}
export function GroupSearch({ user }: ISearchGroupProps) {
  const { searchGroup, groupSearchListResult, isLoading } = useGroupContext();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      search: '',
    },
  });
  const notJoinedGroups = useMemo(
    () =>
      groupSearchListResult?.filter((group) => !group.users.includes(user?.id)),
    [groupSearchListResult, user]
  );

  useEffect(() => {
    searchGroup(form.values.search);
  }, [form.values.search, searchGroup]);

  const handleGroupItemClick = useCallback(
    (groupId: string) => {
      navigate(`${navigateData.groupsSearch}${groupId}`);
    },
    [navigate]
  );

  return (
    <Stack spacing={0}>
      <Stack align="stretch" spacing={0}>
        <form
          onSubmit={form.onSubmit((values) => {
            searchGroup(values.search);
          })}
        >
          <TextInput icon={<Search />} {...form.getInputProps('search')} />
        </form>
      </Stack>
      {notJoinedGroups && (
        <Paper withBorder>
          <GroupList
            isLoading={isLoading}
            groupList={notJoinedGroups}
            onItemClick={handleGroupItemClick}
          />
        </Paper>
      )}
    </Stack>
  );
}

export default GroupSearch;
