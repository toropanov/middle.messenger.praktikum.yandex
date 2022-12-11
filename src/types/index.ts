import { BUTTON_TYPES, HTTP_REQUEST_METHODS } from "../consts";
import Block from "../utils/Block";
export type ValueOf<T> = T[keyof T];

enum Routes {
  MAIN = '/',
  CHAT = '/chat',
  AUTH = '/auth',
  SIGN_IN = '/sign_in',
  SIGN_UP = '/sign_up',
  PROFILE = '/profile',
  PROFILE_EDIT = '/profile_edit',
  ERROR = '/404',
}

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

export interface IRequest {
  url: string,
  data: {
    headers: { [key: string]: string },
    data: { [key: string]: string | number },
    method: ValueOf<typeof HTTP_REQUEST_METHODS>,
    async: boolean
  },
  timeout: number
}

export interface IPopup {
  title: string,
  content: HTMLElement | string,
  button?: Block
}

export interface IForm {
  buttonLabel: string,
  events: {
    submit: (ev: Event) => void
  },
  fields: unknown,
  readOnly?: boolean
}

export interface IButton {
  class?: string,
  label: string,
  type?: ValueOf<typeof BUTTON_TYPES>, 
  events?: {
    click: (ev: Event) => void
  },
}

export interface IInput {
  label: string,
  name: string,
  value: string | number,
  type: unknown, // TODO: Write it normally some day
  placeholder: string,
  required: boolean,
  pattern: string,
  events: {
    input: (ev: Event) => void,
    blur: (ev: Event) => void,
    change: (ev: Event) => void,
  }
}

export interface IMessage {
  direction: 0 | 1,
  user: number,
  text: string
}

export interface IChain {
  id: number,
  user: string,
  last_message: string,
  updated_at: string,
  unread_count: number,
  avatar_url: string
}

export interface IUser {
  id: number,
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  phone: string
}
