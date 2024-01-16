import { TextInput, Button, Group, Center, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form/';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface ISigninProps {}

export function Signin(props: ISigninProps) {
  const { signIn } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSignin = () => {
    signIn(form.values);
    navigate('/feed');
  };

  return (
    <Center>
      <Group title="Sign In">
        <form onSubmit={form.onSubmit(() => handleSignin())}>
          <TextInput
            withAsterisk
            label={t('signup.email')}
            placeholder={t('signup.placeholderEmail')}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            withAsterisk
            label={t('signup.password')}
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">{t('header.signin')}</Button>
          </Group>
        </form>
      </Group>
    </Center>
  );
}

export default Signin;
