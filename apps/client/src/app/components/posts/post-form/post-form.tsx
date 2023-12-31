import { Container, Button, Box, Flex, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IPost } from '../../../contexts/post-provider/post-provider.interface';
import EmojiTextArea from '../../emoji-text-area/emoji-text-area';
import { useCallback } from 'react';

type THandleCloseFormFunction = (openState: boolean) => void;
type TOnFormSubmitFuntion = (values: IPost) => void;
export interface IPostFormProps {
  post?: IPost;
  isOpen: boolean;
  onCloseForm: THandleCloseFormFunction;
  isEditing?: boolean;
  onFormSubmit: TOnFormSubmitFuntion;
}

export function PostForm({
  post,
  isEditing = false,
  isOpen,
  onCloseForm,
  onFormSubmit,
}: IPostFormProps) {
  const formValues =
    isEditing && post
      ? { contentText: post?.contentText }
      : { contentText: '' };

  const form = useForm({
    initialValues: formValues,

    validate: {
      contentText: (value) =>
        value.length < 10 ? 'Text must have at least 10 letters' : null,
    },
  });

  const handleFormSubmit = useCallback(
    (values: IPost) => {
      onCloseForm(isOpen);
      onFormSubmit(values);
      form.reset();
    },
    [form, isOpen, onCloseForm, onFormSubmit]
  );

  return (
    <Modal
      opened={isOpen}
      onClose={() => onCloseForm(isOpen)}
      closeButtonProps={{
        size: 'lg',
        radius: 100,
        display: 'flex',
      }}
    >
      <Container>
        <Box maw={800} mx="auto">
          <form
            onSubmit={form.onSubmit((values) =>
              handleFormSubmit(values as IPost)
            )}
          >
            <EmojiTextArea
              radius="sm"
              withSendIcon={false}
              minRows={6}
              onSubmit={() => ''}
              {...form.getInputProps('contentText')}
            />

            <Flex justify="flex-end" mt="md" gap={10}>
              {isEditing ? (
                <Button type="submit">Confirm</Button>
              ) : (
                <Button type="submit">Create</Button>
              )}
              <Button color="gray" onClick={() => onCloseForm(isOpen)}>
                Cancel
              </Button>
            </Flex>
          </form>
        </Box>
      </Container>
    </Modal>
  );
}

export default PostForm;
