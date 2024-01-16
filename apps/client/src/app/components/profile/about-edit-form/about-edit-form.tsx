import { Button, Group, Stack, Textarea, Title } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { useTranslation } from 'react-i18next';

export interface AboutEditFormProps {
  value: string;
  onSubmit: (value: string) => void;
}

export function AboutEditForm({ value, onSubmit }: AboutEditFormProps) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      aboutText: value,
    },
    validate: {
      aboutText: hasLength({ min: 5, max: 50 }, t('profile.aboutReq')),
    },
  });

  const handleSubmit = (value: string) => {
    onSubmit(value);
    form.reset();
  };
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values.aboutText))}>
      <Stack spacing={10}>
        <Title order={4} mb={5}>
          {t('profile.updateAbout')}
        </Title>
        <Textarea
          placeholder="Your profile description"
          minRows={2}
          maxRows={5}
          {...form.getInputProps('aboutText')}
        />
        <Group position="right" mt="md">
          <Button type="submit">{t('profile.submit')}</Button>{' '}
        </Group>
      </Stack>
    </form>
  );
}

export default AboutEditForm;
