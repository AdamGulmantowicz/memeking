import { TextInput, Button, Group, Center, PasswordInput } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import PasswordStrenghtInput from '../../components/password-input/password-strength-input';

export function Signup() {
  const { signUp } = useAuthContext();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      emailVisibility: true,
      password: 'secret',
      passwordConfirm: 'secret',
      name: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      username: hasLength(
        { min: 2, max: 10 },
        'Name must be 2-10 characters long'
      ),
      passwordConfirm: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  return (
    <Center>
      <Group title="Sign Up">
        <form onSubmit={form.onSubmit((values) => signUp(values))}>
          <TextInput
            withAsterisk
            label={t('signup.username')}
            placeholder={t('signup.username')}
            {...form.getInputProps('username')}
          />
          <TextInput
            withAsterisk
            label={t('signup.name')}
            placeholder={t('signup.placeholderName')}
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label={t('signup.email')}
            placeholder={t('signup.placeholderEmail')}
            {...form.getInputProps('email')}
          />
          <PasswordStrenghtInput {...form.getInputProps('password')} />
          <PasswordInput
            withAsterisk
            label={t('signup.confirm')}
            {...form.getInputProps('passwordConfirm')}
          />

          <Group position="right" mt="md">
            <Button type="submit">{t('header.signup')}</Button>
          </Group>
        </form>
      </Group>
    </Center>
  );
}

export default Signup;
