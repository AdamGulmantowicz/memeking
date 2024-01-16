import { Button, Group, PasswordInput, Stack, Title } from '@mantine/core';
import PasswordStrenghtInput from '../../password-input/password-strength-input';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';

export interface PasswordEditFormProps {
  value: string;
  onSubmit: (value: string) => void;
}

export function PasswordEditForm({ value, onSubmit }: PasswordEditFormProps) {
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      password: 'secret',
      passwordConfirm: 'secret',
    },
    validate: {
      passwordConfirm: (value, values) =>
        value !== values.password ? t('signup.passwordNotMatch') : null,
    },
  });
  const handleSubmit = (value: string) => {
    onSubmit(value);
    form.reset();
  };
  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values.password))}>
        <Stack spacing={10}>
          <Title order={4} mb={5}>
            {t('profile.updatePassword')}
          </Title>
          <PasswordStrenghtInput {...form.getInputProps('password')} />
          <PasswordInput
            withAsterisk
            label={t('signup.confirm')}
            {...form.getInputProps('passwordConfirm')}
          />
          <Group position="right" mt="md">
            <Button type="submit">{t('profile.submit')}</Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}

export default PasswordEditForm;
