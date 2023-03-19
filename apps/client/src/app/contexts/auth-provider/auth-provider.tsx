import React, { useState, useEffect, useContext, useMemo } from 'react';
import { pb } from '../../utils/pocketbase';
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
  emailVisibility?: boolean;
}) => Promise<void>;

export type TLogoutFunction = () => void;

export interface IUser {
  email: string;
  avatar: string;
  id: string;
  load: string;
}

export type TUserModel = Record | Admin | null;

export interface IAuthContext {
  signIn: TSignInFunction;
  signUp: TSignUpFunction;
  logout: TLogoutFunction;
  user: TUserModel;
  isLoggedIn: boolean;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<TUserModel>(null);

  const isLoggedIn = useMemo(() => !!user, [user]);

  useEffect(() => {
    const unregister = pb.authStore.onChange((token) => {
      setUser(pb.authStore.model);
    });

    return () => {
      unregister();
    };
  }, []);

  const signUp: TSignUpFunction = async (params) => {
    await pb.collection('users').create(params);
  };

  const signIn: TSignInFunction = async ({ email, password }) => {
    await pb.collection('users').authWithPassword(email, password);
  };

  const logout: TLogoutFunction = async () => {
    pb.authStore.clear();
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn, logout, user, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const data = useContext(AuthContext);

  if (!data) {
    throw Error('useAuthContext should be used inside of AuthProvider');
  }

  return data;
};
