import {
  Avatar,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface IContentFormBarProps {
  onFormClick: () => void;
}

export function ContentFormBar({ onFormClick }: IContentFormBarProps) {
  const { t, i18n } = useTranslation();

  return (
    <Stack align="stretch">
      <Paper radius={15} p={20}>
        <Group noWrap mb={15}>
          <UnstyledButton>
            <Avatar radius={100} size="lg" />
          </UnstyledButton>
          <Button
            radius={50}
            variant="light"
            color="gray"
            fullWidth
            size="md"
            onClick={() => onFormClick()}
          >
            {t('contentFormBar.writeSomething')}
          </Button>
        </Group>
        <Divider mb={15} />
      </Paper>
    </Stack>
  );
}

export default ContentFormBar;
