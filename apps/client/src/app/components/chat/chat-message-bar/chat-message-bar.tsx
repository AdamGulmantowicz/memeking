import { ActionIcon, Group } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Send } from 'tabler-icons-react';
import EmojiTextArea, {
  TOnTextSubmitFunction,
} from '../../emoji-text-area/emoji-text-area';

export interface IChatMessageBarProps {
  chatId: string;
  onTextSubmit: TOnTextSubmitFunction;
  isLoading: boolean;
}

export function ChatMessageBar({
  chatId,
  onTextSubmit,
  isLoading,
}: IChatMessageBarProps) {
  const form = useForm({
    initialValues: {
      chatInput: '',
    },
    validate: {
      chatInput: isNotEmpty(''),
    },
  });

  const handleChatInput = (values: string) => {
    if (!values) return;
    onTextSubmit(values, chatId);
    form.reset();
  };
  return (
    <form
      key={chatId}
      id={chatId}
      onSubmit={form.onSubmit((values) => {
        handleChatInput(values.chatInput);
      })}
    >
      <Group position="apart">
        <EmojiTextArea
          withSendIcon={false}
          onSubmit={handleChatInput}
          radius="xl"
          {...form.getInputProps('chatInput')}
        />
        <ActionIcon
          loading={isLoading}
          size="xl"
          type="submit"
          variant="filled"
          radius="xl"
        >
          <Send />
        </ActionIcon>
      </Group>
    </form>
  );
}

export default ChatMessageBar;
