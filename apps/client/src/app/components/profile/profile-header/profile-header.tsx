import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Dots, FileUpload } from 'tabler-icons-react';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useState } from 'react';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import { useTranslation } from 'react-i18next';
import styles from './profile-header.module.css';
import { FileWithPath } from '@mantine/dropzone';

export interface ProfileHeaderProps {
  user: IUser;
  userPostsList: IPost[] | null;
  onAvatarSubmit: (images: FileWithPath[]) => void;
  onBackgroundSubmit: (images: FileWithPath[]) => void;
}

export function ProfileHeader({
  user,
  userPostsList,
  onAvatarSubmit,
  onBackgroundSubmit,
}: ProfileHeaderProps) {
  const [isAvatarOpened, setIsAvatarOpened] = useState(false);
  const [isBackgroundOpened, setIsBackgroundOpened] = useState(false);
  const [avatar, setAvatar] = useState<FileWithPath[]>();
  const [background, setBackground] = useState<FileWithPath[]>();

  const { t } = useTranslation();

  const handleAvatarSubmit = () => {
    if (avatar) onAvatarSubmit(avatar);
    setIsAvatarOpened(false);
  };
  const handleBackgroundSubmit = () => {
    if (background) onBackgroundSubmit(background);
    setIsBackgroundOpened(false);
  };

  return (
    <>
      <Card>
        <Card.Section
          mih={200}
          style={{
            background: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage:
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              `url(${import.meta.env.VITE_FILES_URL}/users/${user?.id}/${
                user?.backgroundImage
              })`,
          }}
        >
          <div className={styles.overlay} />
          <Flex h="100%" justify="flex-end" align="flex-end">
            <Menu>
              <Menu.Target>
                <ActionIcon variant="filled">
                  <Dots />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<FileUpload />}
                  onClick={() => setIsBackgroundOpened(!isBackgroundOpened)}
                >
                  {t('profile.selectImage')}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Card.Section>
      </Card>
      <Group
        position="left"
        mb="xl"
        mt={-60}
        ml="sm"
        className={styles.userInfo}
      >
        <Menu>
          <Menu.Target>
            <UnstyledButton>
              <Avatar
                size="xl"
                radius={100}
                src={
                  user && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  `${import.meta.env.VITE_FILES_URL}/users/${user?.id}/${
                    user?.avatar
                  }`
                }
              />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<FileUpload />}
              onClick={() => setIsAvatarOpened(!isAvatarOpened)}
            >
              {t('profile.selectImage')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Flex direction="column">
          <Title>{user?.name}</Title>
          <Group>
            <Group>
              <Text> {t('profile.memes')}:</Text>
              <Text>0</Text>
            </Group>
            <Group>
              <Text> {t('profile.posts')}:</Text>
              <Text>{userPostsList?.length}</Text>
            </Group>
            <Group>
              <Text> {t('profile.following')}:</Text>
              <Text>{user?.followers.length}</Text>
            </Group>
          </Group>
          <Text>{user?.aboutText}</Text>
        </Flex>
      </Group>
      <Modal
        opened={isAvatarOpened}
        onClose={() => setIsAvatarOpened(!isAvatarOpened)}
      >
        <Stack mb={15}>
          <DropzoneButton onSubmit={(values) => setAvatar(values.images)} />
          <Button fullWidth type="submit" onClick={() => handleAvatarSubmit()}>
            {t('groups.submitImage')}
          </Button>
        </Stack>
      </Modal>
      <Modal
        opened={isBackgroundOpened}
        onClose={() => setIsBackgroundOpened(!isBackgroundOpened)}
      >
        <Stack mb={15}>
          <DropzoneButton onSubmit={(values) => setBackground(values.images)} />
          <Button
            fullWidth
            type="submit"
            onClick={() => handleBackgroundSubmit()}
          >
            {t('groups.submitImage')}
          </Button>
        </Stack>
      </Modal>
    </>
  );
}

export default ProfileHeader;
