import {
  Box,
  Button,
  Group,
  ThemeIcon,
  UnstyledButton,
  Stack,
  CloseButton,
  Title,
  Divider,
  Text,
} from '@mantine/core';
import { Cards, Plus, Social } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate } from 'react-router-dom';
import GroupForm from '../../components/groups/group-form/group-form';
import GroupList from '../../components/groups/group-list/group-list';
import { useGroupContext } from '../../contexts/group-provider/group-provider';
import GroupTabs from '../../components/groups/groups-tabs/group-tabs';
import GroupSearch from '../../components/groups/group-search/group-search';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useChatContext } from '../../contexts/chat-provider/chat-provider';

export function Navbar() {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const { followingList } = useChatContext();
  const { user } = useAuthContext();
  const { t } = useTranslation();

  const { groupListResult, isLoading } = useGroupContext();

  const handleGroupItemClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };
  if (!user) return;
  return (
    isLoggedIn && (
      <Stack>
        <Routes>
          <Route
            path="/*"
            element={
              <Stack>
                <UnstyledButton onClick={() => navigate('/feed')}>
                  <Group>
                    <ThemeIcon color="yellow" size={30}>
                      <Cards size="1.1rem" />
                    </ThemeIcon>
                    <Box>Feed</Box>
                  </Group>
                </UnstyledButton>
                <UnstyledButton onClick={() => navigate('/groups/feed')}>
                  <Group>
                    <ThemeIcon color="grape" size={30}>
                      <Social size="1.1rem" />
                    </ThemeIcon>
                    <Box>{t('nav.groups')}</Box>
                  </Group>
                </UnstyledButton>
              </Stack>
            }
          />
          <Route
            path="/groups/*"
            element={
              <Stack align="stretch">
                <Title size="h2">{t('nav.groups')}</Title>
                <GroupSearch user={user} />
                <GroupTabs />
                <Button
                  onClick={() => navigate('/groups/create')}
                  leftIcon={<Plus />}
                >
                  {t('groups.createNewGroup')}
                </Button>
                <Divider />
                <GroupList
                  isLoading={isLoading}
                  groupList={groupListResult}
                  onItemClick={handleGroupItemClick}
                />
              </Stack>
            }
          />
          <Route
            path="groups/create"
            element={
              <Stack align="stretch">
                <CloseButton
                  size="md"
                  radius={50}
                  onClick={() => navigate('/groups/feed')}
                />
                {followingList ? (
                  <GroupForm followingList={followingList} />
                ) : (
                  <Text>{t('groups.followFirst')}</Text>
                )}
              </Stack>
            }
          ></Route>
        </Routes>
      </Stack>
    )
  );
}

export default Navbar;
