import { useChatContext } from '../../../contexts/chat-provider/chat-provider';
import ChatWindow from '../chat-window/chat-window';
import styles from './chats-container.module.css';
import { ChatWindowProvider } from '../../../contexts/chat-window-provider/chat-window-provider';

export function ChatsContainer() {
  const { openChats } = useChatContext();

  return (
    <div className={styles['chat-container']}>
      {openChats?.map((chat) => (
        <ChatWindowProvider key={chat.id} currentChat={chat}>
          <ChatWindow />
        </ChatWindowProvider>
      ))}
    </div>
  );
}

export default ChatsContainer;
