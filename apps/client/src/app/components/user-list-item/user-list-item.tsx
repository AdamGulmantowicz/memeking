import { THandleAddFollowingFunction } from '../../contexts/chat-provider/chat-provider.interface';
import { TUpdateChatFunction } from '../../contexts/chat-window-provider/chat-window-provider.interface';

export interface IUserListItemProps {
  label: string;
  avatar: string;
  id: string;
  values: string[] | undefined;
  onAddUser: THandleAddFollowingFunction | TUpdateChatFunction;
  onRemoveUser: (value: string) => void;
  handleItemClick: (id: string) => void;
  isLoading: boolean;
  card?: boolean;
  itemActive: boolean;
}
export type TListItem = (props: IUserListItemProps) => JSX.Element;

export function UserListItem(listItem: TListItem, props: IUserListItemProps) {
  const listItemContent = listItem;
  return listItemContent(props);
}

export default UserListItem;
