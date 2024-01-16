import { NavLink as MantineNavLink, Stack } from '@mantine/core';
import { useNavigate, NavLink } from 'react-router-dom';
import { Cardboards, Users } from 'tabler-icons-react';
import { navigateData } from '../../../utils/navigate';
import { useTranslation } from 'react-i18next';

export function GroupTabs() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack align="stretch">
      <NavLink
        to="/groups/feed"
        style={({ isActive, isPending }) => {
          return { textDecoration: 'none' };
        }}
      >
        {({ isActive }) => (
          <MantineNavLink
            label={t('groups.yourFeed')}
            icon={<Cardboards />}
            active={isActive}
            onClick={() => navigate(navigateData.groupsFeed)}
          />
        )}
      </NavLink>
      <NavLink
        to="/groups/joins"
        style={({ isActive, isPending }) => {
          return { textDecoration: 'none' };
        }}
      >
        {({ isActive }) => (
          <MantineNavLink
            label={t('groups.yourGroups')}
            icon={<Users />}
            active={isActive}
            onClick={() => navigate(navigateData.groupsJoins)}
          />
        )}
      </NavLink>
    </Stack>
  );
}

export default GroupTabs;
