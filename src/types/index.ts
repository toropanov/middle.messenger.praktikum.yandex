import { BUTTON_TYPES, HTTP_REQUEST_METHODS } from "../consts";
import Block from "../core/Block";
export type ValueOf<T> = T[keyof T];

export enum Routes {
  MAIN = '/',
  CHAT = '/messenger/',
  AUTH = '/auth/',
  PROFILE = '/settings/',
  ERROR = '/404/',
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

export enum StoreEvents {
  UPDATED = 'store:updated'
}

export type IPlainObject = { [key: string]: unknown }

export type SigninRequestData = {
  login: string,
  passwod: string
}

export type SignupRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type ChatCreateRequestData = {
  title: string,
}

export type ChatDeleteRequestData = {
  chatId: number,
}

export type ChatSendMessageRequestData = {
  chatId: number,
}

export type ChatAddParticipantsRequestData = {
  users: number[],
  chatId: number
}

export type ChatDeleteParticipantsRequestData = {
  users: number[],
  chatId: number
}

export type ProfileChangeRequestData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export type ProfileAvatarChangeRequestData = {
  avatar: File
}

export type ProfilePasswordChangeRequestData = {
  oldPassword: string,
  newPassword: string
}

export type ResourcesUploadRequestData = {
  resource: File
}

export type SearchByLoginRequestData = {
  login: string
}


export interface IRequestOptions {
  headers?: Record<string, string>,
  data?: Record<string, unknown>,
  method?: ValueOf<typeof HTTP_REQUEST_METHODS>,
  async?: boolean
}

export interface IPopup {
  title: string,
  content: HTMLElement | string,
  button?: Block
}

export interface IAuth {
  isMember: boolean
}

export interface IParticipants {
  isSuggestions: boolean,
  chatID: number
}

export interface IParticipant {
  isSuggestions: boolean
}

export interface IForm {
  id: string,
  class?: string,
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
  id?: number,
  user?: string,
  last_message?: string,
  updated_at?: string,
  unread_count?: number,
  avatar_url?: string,
  messages?: IMessage[],
  participantSuggestions?: IParticipant[],
  participants?: IParticipant[]
}

export interface IUser {
  id: number,
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  phone: string
}

export interface IStore {
  user: IUser | null,
  activeChain: IChain | null,
  chains: IChain[] | null,
  version: number
}

export type IState = Record<string, unknown> & { activeChain?: IChain | null };

export type IDispatch = (
  nextStateOrAction: IDispatch | IState,
  payload?: unknown,
  store?: IStore
) => void

export interface IResponse {
  status: number,
  statusText: string,
  error: Error,
  response: string,
  text: ()=>string,
  json: ()=>string,
}
