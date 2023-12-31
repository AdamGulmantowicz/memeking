import { ActionIcon, Menu, ScrollArea, Text, Container } from '@mantine/core';
import { Message2 } from 'tabler-icons-react';
import { useState } from 'react';
import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import LoaderComponent from '../../loader/loader';
import ChatItem from '../chat-item/chat-item';
import { IUser } from '../../../contexts/auth-provider/auth-provider.interface';

export function ChatList() {
  const [active, setActive] = useState(false);
  const { userChatsList, isLoading } = useChatContext();

  return (
    <LoaderComponent isLoading={isLoading}>
      <Menu
        width={250}
        zIndex={1000}
        withinPortal
        onOpen={() => setActive(true)}
        onClose={() => setActive(false)}
      >
        <Menu.Target>
          <ActionIcon
            size="lg"
            radius="lg"
            color={active ? 'blue' : 'gray'}
            variant={active ? 'filled' : 'outline'}
          >
            <Message2 color="white" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Messages</Menu.Label>
          <ScrollArea>
            {userChatsList?.length === 0 ? (
              <Container p={10}>
                <Text>'No chats, start a new one.' </Text>
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
