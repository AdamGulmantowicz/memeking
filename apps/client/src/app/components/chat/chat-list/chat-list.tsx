import { Menu, ScrollArea, Text, Container, Button } from '@mantine/core';
import { Message2 } from 'tabler-icons-react';
import { useState } from 'react';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import LoaderComponent from '../../loader/loader';
import ChatItem from '../chat-item/chat-item';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';
import { useTranslation } from 'react-i18next';

export function ChatList() {
  const [active, setActive] = useState(false);
  const { userChatsList, isLoading } = useChatContext();
  const { t } = useTranslation();

  return (
    <LoaderComponent isLoading={isLoading}>
      <Menu
        width={250}
        withinPortal
        onOpen={() => setActive(true)}
        onClose={() => setActive(false)}
      >
        <Menu.Target>
          <Button
            size="md"
            radius={100}
            color={active ? 'blue' : 'gray'}
            variant={active ? 'outline' : 'subtle'}
            p={2}
          >
            <Message2 size="md" color="white" />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{t('chat.messages')} </Menu.Label>
          <ScrollArea>
            {userChatsList?.length === 0 ? (
              <Container p={10}>
                <Text> {t('chat.noChats')} </Text>
              </Container>
            ) : (
              userChatsList?.map((chat) => (
                <ChatItem
                  key={chat.id}
                  id={chat.id}
                  avatar={chat.avatar}
                  expand={chat.expand.users as IUser[]}
                />
              ))
            )}
          </ScrollArea>
        </Menu.Dropdown>
      </Menu>
    </LoaderComponent>
  );
}

export default ChatList;
