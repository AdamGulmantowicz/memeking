import { Avatar, Group, HoverCard, Paper, Text } from '@mantine/core';
import { useAuthContext } from '../../contexts/auth-provider/auth-provider';

/* eslint-disable-next-line */
export interface MessageProps {
  avatar?: string;
  id: string;
  content: string;
  timestamp: string | number;
}

export function Message(props: MessageProps) {
  const { user } = useAuthContext();
  // TODO FIX DATE TYPE ASSIGNMENT
  const dateObj = new Date(props?.timestamp);
  const formattedDate = `${dateObj.toLocaleString('en-US', {
    month: 'long',
  })} ${dateObj.getDate()}, ${dateObj.getFullYear()} at ${dateObj.getHours()}:${dateObj.getMinutes()}`;

  return (
    <Group position={props.id === user?.id ? 'right' : 'left'}>
      <HoverCard
        withinPortal={true}
        openDelay={500}
        position="left"
        radius="lg"
      >
        <HoverCard.Target>
          <Paper
            shadow="xs"
            radius="lg"
            my={2}
            p="md"
            bg={props.id === user?.id ? 'blue' : 'gray'}
            maw={280}
          >
            {props.avatar && <Avatar src={props.avatar} />}
            <Text lineClamp={200} weight={500}>
              {props.content}
            </Text>
          </Paper>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text>{formattedDate}</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}

export default Message;
