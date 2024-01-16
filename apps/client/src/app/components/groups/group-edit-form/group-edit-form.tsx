import { Paper, Textarea, Stack, Button } from '@mantine/core';
import { DropzoneButton } from '../../dropzone-button/dropzone-button';
import { useForm } from '@mantine/form';
import { IGroup } from '../../../contexts/group-provider/group-provider.interface';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface IGroupEditFormProps {
  group: IGroup;
  onSubmitAbout: (aboutText: string | null) => void;
  onSubmitImage: (image: FileWithPath[]) => void;
}

export function GroupEditForm({
  group,
  onSubmitAbout,
  onSubmitImage,
}: IGroupEditFormProps) {
  const [image, setImage] = useState<FileWithPath[]>();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      aboutText: group?.aboutText,
      avatar: group?.avatar,
    },
  });

  return (
    <Paper>
      <Stack mb={15}>
        <DropzoneButton onSubmit={(values) => setImage(values.images)} />
        <Button fullWidth onClick={() => image && onSubmitImage(image)}>
          {t('groups.submitImage')}
        </Button>
      </Stack>
      <form
        onSubmit={form.onSubmit((values) =>
          onSubmitAbout(values.aboutText as string)
        )}
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
            {t('groups.submitDescription')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
export default GroupEditForm;
