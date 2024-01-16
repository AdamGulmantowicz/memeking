import { Button, Group, Modal, Paper, Text } from '@mantine/core';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { Dots, InfoCircle, Lock, Mail, User } from 'tabler-icons-react';
import EmailEditForm from '../email-edit-form/email-edit-form';
import { useState } from 'react';
import NameEditForm from '../name-edit-form/name-edit-form';
import AboutEditForm from '../about-edit-form/about-edit-form';
import PasswordEditForm from '../password-edit-form/password-edit-form';
import { useAuthContext } from '../../../contexts/auth-provider/auth-provider';
import { pb } from '../../../utils/pocketbase';

/* eslint-disable-next-line */
export interface ProfileSettingsProps {
  user: IUser;
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const { updateCurrentUser } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [openFormType, setOpenFormType] = useState('');

  const handleOpenForm = (value: string) => {
    setIsOpen(true);
    setOpenFormType(value);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
    setOpenFormType('');
  };

  const handleUpdateName = (value: string) => {
    updateCurrentUser({ name: value });
    handleCloseForm();
  };
  const handleUpdateAbout = (value: string) => {
    updateCurrentUser({ aboutText: value });
    handleCloseForm();
  };

  const handleUpdateEmail = (value: string) => {
    pb.collection('users').requestEmailChange(value);
    handleCloseForm();
  };
  const handleUpdatePassword = (value: string) => {
    updateCurrentUser({ password: value });
    handleCloseForm();
  };
  return (
    <>
      <Group position="apart">
        <Group>
          <User />
          <Text>{user?.name}</Text>
        </Group>
        <Button variant="subtle" onClick={() => handleOpenForm('name')}>
          <Dots />
        </Button>
      </Group>
      <Group position="apart">
        <Group>
          <InfoCircle />
          <Text>{user?.aboutText}</Text>
        </Group>
        <Button variant="subtle" onClick={() => handleOpenForm('about')}>
          <Dots />
        </Button>
      </Group>
      <Group position="apart">
        <Group>
          <Mail />
          <Text>{user?.email} </Text>
        </Group>
        <Button variant="subtle" onClick={() => handleOpenForm('email')}>
          <Dots />
        </Button>
      </Group>
      <Group position="apart">
        <Group>
          <Lock />
          <Text>*******</Text>
        </Group>
        <Button variant="subtle" onClick={() => handleOpenForm('password')}>
          <Dots />
        </Button>
      </Group>
      <Modal onClose={() => handleCloseForm()} opened={isOpen}>
        <Paper p={5} mb={15}>
          {openFormType === 'name' && (
            <NameEditForm value={user.name} onSubmit={handleUpdateName} />
          )}
          {openFormType === 'about' && (
            <AboutEditForm
              value={user.aboutText}
              onSubmit={handleUpdateAbout}
            />
          )}
          {openFormType === 'email' && (
            <EmailEditForm value={user.email} onSubmit={handleUpdateEmail} />
          )}
          {openFormType === 'password' && (
            <PasswordEditForm
              value={user.password}
              onSubmit={handleUpdatePassword}
            />
          )}
        </Paper>
      </Modal>
    </>
  );
}

export default ProfileSettings;
