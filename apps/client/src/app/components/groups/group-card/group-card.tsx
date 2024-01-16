import {
  Avatar,
  Button,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { DoorExit, Dots, SquareLetterX } from 'tabler-icons-react';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useGroupContext } from '../../../contexts/group-provider/group-provider';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export interface IGroupCardProps {
  group: IGroup;
}

export function GroupCard({ group }: IGroupCardProps) {
  const { user } = useAuthContext();
  const { leaveGroup, deleteGroup } = useGroupContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentUsersGroup = useMemo(
    () => group?.author_id === user?.id,
    [group, user]
  );

  return (
    <Paper p={15} radius={10}>
      <Group mb={20}>
        <Avatar
          size="xl"
          radius={15}
          src={
            group?.avatar &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            `${import.meta.env.VITE_FILES_URL}/groups/${group?.id}/${
              group?.avatar
            }`
          }
        />
        <Stack>
          <Title size="sm">{group.title}</Title>
          <Text>{t('groups.lastVisited')}</Text>
        </Stack>
      </Group>

      <Group noWrap>
        <Button fullWidth onClick={() => navigate(`/groups/${group.id}`)}>
          {t('groups.viewGroup')}
        </Button>
        <Menu>
          <Menu.Target>
            <Button color="gray">
              <Dots />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<DoorExit />}
              onClick={() => leaveGroup(group?.id, group?.users)}
            >
              {t('groups.leave')}
            </Menu.Item>
            {currentUsersGroup && (
              <Menu.Item
                icon={<SquareLetterX />}
                onClick={() => deleteGroup(group?.id)}
              >
                {t('groups.delete')}
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
}

export default GroupCard;
