import { Avatar, Button, Title } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';

export interface IGroupItemProps {
  id: string;
  title: string;
  onItemClick: (id: string) => void;
  avatar: FileWithPath;
}

export function GroupListItem({
  id,
  title,
  onItemClick,
  avatar,
}: IGroupItemProps) {
  return (
    <Button
      fullWidth
      color="gray"
      variant="light"
      size="lg"
      mb={5}
      leftIcon={
        <Avatar
          size="md"
          radius={5}
          src={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            avatar && `${import.meta.env.VITE_FILES_URL}/groups/${id}/${avatar}`
          }
        />
      }
      onClick={() => onItemClick(id)}
      styles={(theme) => ({
        root: { display: 'flex' },
      })}
    >
      <Title size={14} weight={500}>
        {title}
      </Title>
    </Button>
  );
}

export default GroupListItem;
