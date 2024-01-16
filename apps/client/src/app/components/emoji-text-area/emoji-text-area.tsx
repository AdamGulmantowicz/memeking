import { MoodSmile, Send } from 'tabler-icons-react';
import { ActionIcon, Popover, Textarea } from '@mantine/core';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useRef,
} from 'react';

export type TOnTextSubmitFunction = (message: string, recordId: string) => void;

export interface IEmojiTextAreaProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSubmit: (value: string) => void;
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'unstyled' | 'filled';
  minRows?: number;
  maxRows?: number;
  label?: string;
  withSendIcon: boolean;
  isLoading?: boolean;
}

export function EmojiTextArea({
  value,
  onChange,
  radius,
  variant = 'default',
  minRows = 2,
  maxRows = 5,
  onSubmit,
  label,
  withSendIcon,
  isLoading,
}: IEmojiTextAreaProps) {
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  const insertAtCursor = useCallback(
    (emoji: string) => {
      const input = emoji.trim();
      const message = value;

      if (!input) {
        return message;
      }
      if (!textarea.current) return message;
      textarea.current.value = message;
      const { selectionStart, selectionEnd } = textarea.current;

      const newMessage =
        message.slice(0, selectionStart) + input + message.slice(selectionEnd);
      if (newMessage) onChange(newMessage);
    },
    [onChange, value]
  );

  const handleChatInput = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (event.type === 'click') return;
      onChange(event.currentTarget.value);
    },
    [onChange]
  );

  const handleOnKeydown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSubmit(event.currentTarget.value);
      }
    },
    [onSubmit]
  );

  return (
    <Textarea
      radius={radius}
      size="md"
      autosize
      variant={variant}
      minRows={minRows}
      maxRows={maxRows}
      ref={textarea}
      value={value}
      label={label}
      onChange={(event) => handleChatInput(event)}
      onKeyDown={(event) => {
        handleOnKeydown(event);
      }}
      rightSectionWidth={60}
      rightSection={
        <>
          {withSendIcon && (
            <ActionIcon
              loading={isLoading}
              size="xl"
              type="submit"
              variant="filled"
              radius="xl"
              ml={-55}
              mr={10}
            >
              <Send />
            </ActionIcon>
          )}
          <Popover
            withArrow={true}
            arrowPosition="center"
            arrowSize={25}
            arrowRadius={5}
            withinPortal={true}
            offset={25}
            keepMounted={true}
          >
            <Popover.Dropdown p={0}>
              <Picker
                data={data}
                onEmojiSelect={(emoji: { native: string }) => {
                  insertAtCursor(emoji.native);
                }}
                locale="en"
                theme="dark"
              />
            </Popover.Dropdown>
            <Popover.Target>
              <ActionIcon size="xl" variant="filled" radius="xl">
                <MoodSmile size={28} />
              </ActionIcon>
            </Popover.Target>
          </Popover>
        </>
      }
    />
  );
}

export default EmojiTextArea;
