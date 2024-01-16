import {
  Avatar,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { useNavigate } from 'react-router-dom';
import { navigateData } from '../../../utils/navigate';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface IGroupSearchListItemProps {
  group: IGroup;
}

export function GroupSearchListItem({ group }: IGroupSearchListItemProps) {
  const { joinGroup } = useGroupContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleJoinGroup = useCallback(() => {
    joinGroup(group?.users, group?.id);
    navigate(`/groups/${group?.id}`);
  }, [group, joinGroup, navigate]);
  return (
    <Paper p={15} mb={10} radius={15}>
      <Group position="apart" noWrap>
        <Group noWrap align="flex-start">
          <Avatar size="lg" radius={10} />

          <Stack spacing={0}>
            <UnstyledButton
              onClick={() => navigate(`${navigateData.groups}/${group?.id}`)}
            >
              <Title size="h2">{group?.title}</Title>
            </UnstyledButton>
            <Group spacing={0}>
              <Text>
                {group.users.length} {t('groups.members')}
              </Text>
            </Group>
            <Text>{group?.aboutText}</Text>
          </Stack>
        </Group>
        <Button onClick={() => handleJoinGroup()}>{t('groups.join')}</Button>
      </Group>
    </Paper>
  );
}

export default GroupSearchListItem;
