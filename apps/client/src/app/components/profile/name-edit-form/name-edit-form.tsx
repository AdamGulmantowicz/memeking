import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

export interface NameEditFormProps {
  value: string;
  onSubmit: (value: string) => void;
}

export function NameEditForm({ value, onSubmit }: NameEditFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      name: value,
    },
    validate: {
      name: (value) => (value.length < 2 ? t('profile.nameReq') : null),
    },
  });

  const handleSubmit = (value: string) => {
    onSubmit(value);
    form.reset();
  };
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values.name))}>
      <Stack spacing={10}>
        <Title order={4} mb={5}>
          {t('profile.updateName')}
        </Title>
        <TextInput {...form.getInputProps('name')} />
        <Group position="right" mt="md">
          <Button type="submit">{t('profile.submit')}</Button>
        </Group>
      </Stack>
    </form>
  );
}

export default NameEditForm;
