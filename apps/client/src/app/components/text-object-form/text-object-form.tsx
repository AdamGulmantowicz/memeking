import { useForm } from '@mantine/form';
import { Textarea, Button, Group } from '@mantine/core';
import { ObjectScheme, TextScheme } from '../../types';

export interface TextObjectFormProps {
  onSubmit: (values: ObjectScheme) => void;
  object: TextScheme;
}

export function TextObjectForm({ onSubmit, object }: TextObjectFormProps) {
  const form = useForm({
    initialValues: {
      content: object.content || '',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit({
          ...object,
          content: values.content,
        });
      })}
    >
      <Textarea
        withAsterisk
        label="Content"
        placeholder="Text for your meme"
        {...form.getInputProps('content')}
      />

      <Group mt={6}>
        <Button type="submit">Add to meme</Button>
      </Group>
    </form>
  );
}

export default TextObjectForm;
