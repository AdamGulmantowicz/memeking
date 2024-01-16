import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

export interface EmailEditFormProps {
  value: string;
  onSubmit: (value: string) => void;
}

export function EmailEditForm({ value, onSubmit }: EmailEditFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: value,
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : t('signup.emailInvalid'),
    },
  });

  const handleSubmit = (value: string) => {
    onSubmit(value);
    form.reset();
  };
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values.email))}>
      <Stack spacing={10}>
        <Title order={4} mb={5}>
          {t('profile.updateEmail')}
        </Title>
        <TextInput {...form.getInputProps('email')} />
        <Group position="right" mt="md">
          <Button type="submit">{t('profile.submit')}</Button>
        </Group>
      </Stack>
    </form>
  );
}

export default EmailEditForm;
