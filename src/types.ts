export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic?: string;
  isBuyer: boolean;
}

export interface IInputs extends IUser {
  password: string;
  confirmPassword: string;
}

export interface IState {
  auth: IAuthState;
  users: IUsersState;
}

export interface IAuthState {
  user: IUser;
  token: string;
  isLoading: boolean;
  error: string | null;
}

export interface IUsersState {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
  page?: number;
  limit?: number;
  totalPage?: number | null;
}
//Api Return TYPES
export interface ILoginType extends IUser {
  token: string;
}

export type UpdatetUserReturnType = Partial<IUser>;

export type GetUsersType = {
  total: string;
  data: IUser[];
};

// Action Types with Their Type Defination

//USERS Action
export const USERS = "users";
export type USERS = typeof USERS;

export const GET_USERS = `${USERS}/loadUsers`;
export type GET_USERS = typeof GET_USERS;

//AUTH Actions
export const AUTH = "auth";
export type AUTH = typeof AUTH;

export const LOGIN = `${AUTH}/login`;
export type LOGIN = typeof LOGIN;

export const SIGNUP = `${AUTH}/signup`;
export type SIGNUP = typeof SIGNUP;

export const UPDATE = `${AUTH}/update`;
export type UPDATE = typeof UPDATE;

export const LOGOUT = `${AUTH}/logout`;
export type LOGOUT = typeof LOGOUT;
