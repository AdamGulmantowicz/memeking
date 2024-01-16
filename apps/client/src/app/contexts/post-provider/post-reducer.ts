import { IPost } from './post-provider.interface';

export interface IPostState {
  currentPost: IPost | null;
  postFormOpen: boolean;
  userPostsList: IPost[] | null;
  isEditing: boolean;
  isLoading: boolean;
  error: string | null;
}

export type TPostActions =
  | { type: 'LOADING'; payload: null }
  | { type: 'LOADING_STOP'; payload: null }
  | { type: 'CLEAR_ERROR'; payload: null | null }
  | { type: 'OPEN_FORM'; payload: null }
  | { type: 'CLOSE_FORM'; payload: null }
  | { type: 'EDIT_POST'; payload: IPost | null }
  | { type: 'UPDATE_POSTS_LIST'; payload: IPost[] };

const Actions = {
  LOADING: 'LOADING',
  LOADING_STOP: 'LOADING_STOP',
  UPDATE_POSTS_LIST: 'UPDATE_POSTS_LIST',
  OPEN_FORM: 'OPEN_FORM',
  CLOSE_FORM: 'CLOSE_FORM',
  EDIT_POST: 'EDIT_POST',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

export const postReducer = (
  state: IPostState,
  action: TPostActions
): IPostState => {
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

    case Actions.UPDATE_POSTS_LIST:
      return {
        ...state,
        isLoading: false,
        userPostsList: action.payload as IPost[],
      };
    case Actions.OPEN_FORM:
      return {
        ...state,
        postFormOpen: true,
      };
    case Actions.CLOSE_FORM:
      return {
        ...state,
        postFormOpen: false,
        currentPost: null,
      };
    case Actions.EDIT_POST:
      return {
        ...state,
        isEditing: true,
        currentPost: action.payload as IPost,
      };
    case Actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    default:
      throw new Error('Unknown action type');
  }
};
