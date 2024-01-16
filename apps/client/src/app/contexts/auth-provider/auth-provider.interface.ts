import { FileWithPath } from '@mantine/dropzone';
import { Record, Admin } from 'pocketbase';

export type TSignInFunction = (params: {
  email: string;
  password: string;
}) => Promise<void>;

export type TSignUpFunction = (params: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  username: string;
}) => Promise<void>;

export type TLogoutFunction = () => void;
export type TUpdateUserAvatarFunction = (images: FileWithPath[]) => void;
export type TUpdateUserBackgroundFunction = (images: FileWithPath[]) => void;

export interface IUser extends Record {
  id: string;
  email: string;
  name: string;
  avatar: FileWithPath;
  followers: string[];
  aboutText: string;
  backgroundImage: FileWithPath;
}
export type TUseUpdateUser = (params: IUser) => Promise<void>;
export type TUserModel = Record | Admin | null;

export interface IAuthContext {
  signIn: TSignInFunction;
  signUp: TSignUpFunction;
  logout: TLogoutFunction;
  user: IUser | null;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  isLoading: boolean;
  updateCurrentUser: (
    data: Partial<IUser>,
    overrideId?: string | undefined
  ) => Promise<void>;
  updateUserAvatar: TUpdateUserAvatarFunction;
  updateUserBackground: TUpdateUserBackgroundFunction;
}
