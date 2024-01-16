import { Box, Button, Divider, MultiSelect, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import FloatingLabelInput from '../../floating-label-input/floating-label-input';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { navigateData } from '../../../utils/navigate';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useTranslation } from 'react-i18next';

export interface IGroupFormProps {
  followingList: IUser[];
}

export function GroupForm({ followingList }: IGroupFormProps) {
  const { createGroup } = useGroupContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      title: '',
      groupUsers: [],
    },
  });

  const searchListdata = useMemo(
    () =>
      followingList.map(({ name: label, id: value }) => ({
        label,
        value,
      })),
    [followingList]
  );

  const handleCreateGroup = useCallback(
    (title: string, groupUsers: string[]) => {
      createGroup(title, groupUsers);
      navigate(navigateData.groups);
    },
    [createGroup, navigate]
  );
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) =>
          handleCreateGroup(values.title, values.groupUsers)
        )}
      >
        <Stack spacing={2}>
          <FloatingLabelInput
            label={t('groups.groupName')}
            placeholder=""
            {...form.getInputProps('title')}
          />
          <MultiSelect
            my={5}
            data={searchListdata}
            placeholder={t('groups.inviteFollowers')}
            searchable
            {...form.getInputProps('groupUsers')}
          />
          <Button type="submit" fullWidth>
            {t('groups.createGroup')}
          </Button>
        </Stack>
      </form>
      <Divider />
    </Box>
  );
}

export default GroupForm;
