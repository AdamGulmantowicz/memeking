import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  MediaQuery,
  Burger,
  Group,
  useMantineTheme,
} from '@mantine/core';

export interface ApplicationFrameProps extends React.PropsWithChildren {
  navbar?: JSX.Element;
  header?: JSX.Element;
  sidebar?: JSX.Element;
  footer?: JSX.Element;
}

export const ApplicationFrame = ({
  navbar,
  header,
  footer,
  sidebar,
  children,
}: ApplicationFrameProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        navbar && (
          <Navbar
            p="sm"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            {navbar}
          </Navbar>
        )
      }
      aside={
        sidebar && (
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              {sidebar}
            </Aside>
          </MediaQuery>
        )
      }
      footer={
        footer && (
          <Footer height={60} p="md">
            {footer}
          </Footer>
        )
      }
      header={
        header && (
          <Header height={{ base: 60 }} px="md" py="sm">
            <Group position="apart">
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              {header}
            </Group>
          </Header>
        )
      }
    >
      {children}
    </AppShell>
  );
};

export default ApplicationFrame;
