export declare enum ProfileActions {
  VIEW = 'VIEW',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  EDIT_FIELDS = 'EDIT_FIELDS',
  EDIT_PASSWORD = 'EDIT_PASSWORD',
}

export declare enum HttpRequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type Props = Record<string, any>
export type Children = Record<string, Props>

export interface IMessage {
  direction: 0 | 1,
  user: number,
  text: string
};

export interface IChain {
  id: number,
  user: string,
  last_message: string,
  updated_at: string,
  unread_count: number,
  avatar_url: string
};

export interface IUser {
  id: number,
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  phone: string
};
