import { useState } from 'react';
import styles from './language-menu.module.css';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

interface IData {
  label: string;
  image: JSX.Element;
  lng: string;
}

export function LanguageMenu() {
  const [opened, setOpened] = useState(false);

  const { t, i18n } = useTranslation();
  const data = [
    {
      label: t('languages.en'),
      image: <ReactCountryFlag countryCode="US" svg />,
      lng: 'en',
    },
    {
      label: t('languages.de'),
      image: <ReactCountryFlag countryCode="DE" svg />,
      lng: 'de',
    },
    {
      label: t('languages.it'),
      image: <ReactCountryFlag countryCode="IT" svg />,
      lng: 'it',
    },
    {
      label: t('languages.fr'),
      image: <ReactCountryFlag countryCode="FR" svg />,
      lng: 'fr',
    },
    {
      label: t('languages.pl'),
      image: <ReactCountryFlag countryCode="PL" svg />,
      lng: 'pl',
    },
  ];
  const [selected, setSelected] = useState(data[0]);
  const handleItemClick = (item: IData) => {
    setSelected(item);
    i18n.changeLanguage(item.lng);
  };

  const items = data.map((item) => (
    <Menu.Item
      icon={item.image}
      onClick={() => handleItemClick(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      withinPortal
      shadow="sm"
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
    >
      <Menu.Target>
        <UnstyledButton
          color={opened ? 'blue' : 'gray'}
          variant={opened ? 'outline' : 'subtle'}
          className={styles.control}
          data-expanded={opened || undefined}
        >
          <Group spacing="xs" align="center" mr={15}>
            {selected.image}
            <span className={styles.label}>{t('languages.currentLang')}</span>
          </Group>
          <ChevronDown size={15} className={styles.icon} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

export default LanguageMenu;
