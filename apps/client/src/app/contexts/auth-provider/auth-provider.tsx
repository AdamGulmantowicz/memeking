import React, { useEffect, useContext, useReducer } from 'react';
import { pb } from '../../utils/pocketbase';
import { useUser, useUserSubscription } from '../../hooks/pb-utils';
import {
  IAuthContext,
  IUser,
  TSignUpFunction,
  TSignInFunction,
  TLogoutFunction,
  TUpdateUserBackgroundFunction,
  TUpdateUserAvatarFunction,
} from './auth-provider.interface';
import { authReducer, IAuthState } from './auth-reducer';

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: '',
};

export const AuthContext = React.createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [{ user, isLoading, isLoggedIn, error }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const { loading, updateOne } = useUser(user?.id);
  const { data: updatedUser } = useUserSubscription(user?.id || '');

  useEffect(() => {
    dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser as IUser });
  }, [updatedUser]);

  useEffect(() => {
    const unregister = pb.authStore.onChange((token, arg) => {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: pb.authStore.model as IUser,
      });
    });

    return () => {
      unregister();
    };
  }, []);

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        dispatch({ type: 'LOADING', payload: null });
        await pb.collection('users').authRefresh();
      } catch (e) {
        console.error(e);
        dispatch({ type: 'AUTH_FAILURE', payload: (e as Error).message });
        // TODO create interface for Pocketbase errors
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if ((e as Error).status === 401) {
          logout();
        }
      }
    };

    refreshAuth();
  }, []);

  const signUp: TSignUpFunction = async (params) => {
    try {
      dispatch({ type: 'LOADING', payload: null });
      await pb.collection('users').create(params);
    } catch (e) {
      console.error(e);
      dispatch({ type: 'AUTH_FAILURE', payload: (e as Error).message });
    }
    dispatch({ type: 'LOADING_STOP', payload: null });
    const loginData = { email: params.email, password: params.password };
    signIn(loginData);
  };

  const signIn: TSignInFunction = async ({ email, password }) => {
    try {
      dispatch({ type: 'LOADING', payload: null });

      await pb.collection('users').authWithPassword(email, password);
    } catch (e) {
      dispatch({ type: 'AUTH_FAILURE', payload: (e as Error).message });
    }
    dispatch({ type: 'LOADING_STOP', payload: null });
  };

  const logout: TLogoutFunction = async () => {
    pb.authStore.clear();
    dispatch({ type: 'SIGNOUT', payload: null });
  };

  const updateUserAvatar: TUpdateUserAvatarFunction = (image) => {
    updateOne({
      avatar: image[0],
    });
  };
  const updateUserBackground: TUpdateUserBackgroundFunction = (image) => {
    updateOne({
      backgroundImage: image[0],
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        user,
        isLoggedIn,
        isLoading: loading,
        isAuthLoading: isLoading,
        updateCurrentUser: updateOne,
        updateUserAvatar,
        updateUserBackground,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const data = useContext(AuthContext);

  if (!data) {
    throw Error('useAuthContext should be used inside of AuthProvider');
  }

  return data;
};
