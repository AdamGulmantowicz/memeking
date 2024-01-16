import { IUser } from './auth-provider.interface';

export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error?: string | null;
}

type TAuthActions =
  | { type: 'LOADING'; payload: null }
  | { type: 'LOADING_STOP'; payload: null }
  | { type: 'CLEAR_ERROR'; payload: null }
  | { type: 'SIGNOUT'; payload: null }
  | { type: 'AUTH_SUCCESS'; payload: IUser | null }
  | { type: 'AUTH_FAILURE'; payload: string | null };

const Actions = {
  LOADING: 'LOADING',
  LOADING_STOP: 'LOADING_STOP',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SIGNOUT: 'SIGNOUT',
};

export const authReducer = (
  state: IAuthState,
  action: TAuthActions
): IAuthState => {
  switch (action.type) {
    case Actions.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.LOADING_STOP:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload as string,
      };

    case Actions.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload as IUser,
      };

    case Actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    case Actions.SIGNOUT:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
      };
    default:
      throw new Error('Unknown action type');
  }
};
