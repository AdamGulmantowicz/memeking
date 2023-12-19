import { Paper, Textarea, Stack, Button } from '@mantine/core';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useForm } from '@mantine/form';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';

/* eslint-disable-next-line */
export interface IGroupEditFormProps {
  group: IGroup | null;
  onSubmitAbout: (aboutText: string | null) => void;
  onSubmitImage: () => void;
}

export function GroupEditForm({
  group,
  onSubmitAbout,
  onSubmitImage,
}: IGroupEditFormProps) {
  const [image, setImage] = useState<FileWithPath[] | null>(null);
  const form = useForm({
    initialValues: {
      aboutText: group?.aboutText,
      avatar: group?.avatar,
    },
  });

  if (!group) return null;
  return (
    <Paper>
      <Stack mb={15}>
        <DropzoneButton onSubmit={setImage} />
        <Button fullWidth type="submit">
          Submit image
        </Button>
      </Stack>
      <form
        onSubmit={form.onSubmit((values) => onSubmitAbout(values.aboutText))}
      >
        <Stack align="stretch">
          <Textarea
            label="About"
            description="Group description"
            placeholder="Write your group description"
            radius={15}
            minRows={2}
            mb={15}
            autosize
            {...form.getInputProps('aboutText')}
          ></Textarea>
          <Button fullWidth type="submit">
            Submit description
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default GroupEditForm;
