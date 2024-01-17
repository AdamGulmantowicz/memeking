import { TextInput, Flex, Button, List, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Search } from 'tabler-icons-react';
import { useEffect } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */

export interface IUserSearch {
  handleSearch: (value: string) => void;
  loading: boolean;
  children: React.ReactElement;
}

export function UserSearch({ handleSearch, loading, children }: IUserSearch) {
  const { t, i18n } = useTranslation();

  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  useEffect(() => {
    handleSearch(form.values.search);
  }, [form.values.search, handleSearch]);

  return (
    <Group>
      <Group>
        <form
          onSubmit={form.onSubmit((values) => {
            handleSearch(values.search);
          })}
        >
          <Flex gap="sm">
            <TextInput icon={<Search />} {...form.getInputProps('search')} />
            <Button type="submit">{t('search.search')}</Button>
          </Flex>
        </form>
      </Group>
      <List mt="lg" size="sm" w="100%">
        {children}
      </List>
    </Group>
  );
}

export default UserSearch;
