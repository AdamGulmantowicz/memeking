import {
  Button,
  Divider,
  Group,
  Image,
  Menu,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  DoorExit,
  Dots,
  Edit,
  Plus,
  TriangleInverted,
  UserCheck,
} from 'tabler-icons-react';
import GroupEditForm from '../group-edit-form/group-edit-form';
import { useCallback, useMemo, useState } from 'react';
import { useGroupWindowContext } from '../../../contexts/group-window-provider/group-window-provider';
import LoaderComponent from '../../loader/loader';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import ContentFormBar from '../../content-form-bar/content-form-bar';
import PostForm from '../../posts/post-form/post-form';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useTranslation } from 'react-i18next';
import { FileWithPath } from '@mantine/dropzone';

export interface IGroupHeaderProps {
  groupId: string;
  user: IUser;
}

export function GroupHeader({ groupId, user }: IGroupHeaderProps) {
  const {
    groupResult,
    updateGroupImage,
    updateGroupDescription,
    joinGroup,
    leaveGroup,
    createGroupPost,
    isLoading,
  } = useGroupWindowContext();
  const [isOpened, setIsOpened] = useState(false);
  const [isFormOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleToggleForm = useCallback(() => {
    setIsOpen(!isFormOpen);
  }, [isFormOpen]);

  const handleCreatePost = useCallback(
    (values: IPost) => {
      createGroupPost(values.contentText, groupId);
    },
    [createGroupPost, groupId]
  );

  const handleUpdateDescription = useCallback(
    (aboutText: string | null) => {
      if (!aboutText) return;
      updateGroupDescription(aboutText);
      setIsOpened(!isOpened);
    },
    [isOpened, updateGroupDescription]
  );
  const handleUpdateImage = (image: FileWithPath[]) => {
    updateGroupImage(image);
    setIsOpened(false);
  };
  const currentUserJoined = useMemo(
    () => groupResult?.users.includes(user.id),
    [groupResult, user]
  );
  const isAdmin = useMemo(
    () => groupResult?.author_id === user?.id,
    [groupResult, user]
  );

  if (!groupResult) return null;
  return (
    <LoaderComponent isLoading={isLoading}>
      <>
        <Paper radius={15} mb={10}>
          <Image
            height={200}
            radius={15}
            mb={15}
            withPlaceholder
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            src={`${import.meta.env.VITE_FILES_URL}/groups/${groupId}/${
              groupResult?.avatar
            }`}
          />
          <Stack mah={500} px={15}>
            <Title>{groupResult?.title}</Title>
            <Text>
              {groupResult?.users.length} {t('groups.members')}
            </Text>
            <Text>{groupResult?.aboutText}</Text>
            <Group position="right">
              {currentUserJoined ? (
                <Menu>
                  <Menu.Target>
                    <Button
                      color="gray"
                      variant="light"
                      leftIcon={<UserCheck />}
                      rightIcon={<TriangleInverted fill="white" size={10} />}
                    >
                      {t('groups.joined')}
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<DoorExit size={15} />}
                      onClick={() => leaveGroup()}
                    >
                      {t('groups.leave')}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button
                  leftIcon={<Plus />}
                  onClick={() => joinGroup(groupResult?.users)}
                >
                  {t('groups.join')}
                </Button>
              )}
              {currentUserJoined ? (
                <Menu>
                  <Menu.Target>
                    <Button>
                      <Dots />
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {isAdmin ? (
                      <Menu.Item
                        onClick={() => setIsOpened(!isOpened)}
                        icon={<Edit size={15} />}
                      >
                        {t('groups.editGroup')}
                      </Menu.Item>
                    ) : (
                      <Menu.Item> {t('groups.editingNot')}</Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              ) : null}
            </Group>

            <Divider mb={20} />
            <Modal opened={isOpened} onClose={() => setIsOpened(!isOpened)}>
              <GroupEditForm
                group={groupResult}
                onSubmitAbout={handleUpdateDescription}
                onSubmitImage={handleUpdateImage}
              />
            </Modal>
          </Stack>
        </Paper>
        {currentUserJoined ? (
          <ContentFormBar onFormClick={handleToggleForm} />
        ) : null}
        <PostForm
          isOpen={isFormOpen}
          onCloseForm={handleToggleForm}
          onFormSubmit={handleCreatePost}
        />
      </>
    </LoaderComponent>
  );
}

export default GroupHeader;
