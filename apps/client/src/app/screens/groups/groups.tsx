import { Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface GroupsProps {}

export function Groups(props: GroupsProps) {
  const { groupId } = useParams();

  return <Title>{groupId}</Title>;
}

export default Groups;
