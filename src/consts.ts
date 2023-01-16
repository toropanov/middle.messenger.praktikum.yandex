export const API_URL = 'https://ya-praktikum.tech/api/v2';

export const API_PATHS = {
  CHAT: 'api/v1/chats',
};

export const HTTP_REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const AUTH_LOCALSTORAGE_KEY = 'ya-authorized';

export const INPUT_TYPES = {
  TEXT: 'text',
  PASSWORD: 'password',
  TEL: 'tel',
  EMAIL: 'email',
  FILE: 'file',
};

export const BUTTON_TYPES = {
  SUBMIT: 'submit',
} as const;

const PATTERNS = {
  LETTERS: '[A-z]+',
  RULETTERS: '[A-zА-я]+',
  NUMBERS: '[0-9]+',
  BOTH: '[A-Za-z0-9]+',
  EMAIL: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
  NAMES: '[A-Za-zА-я]+',
  PHONE: '[0-9]+',
  LOGIN: '[A-Za-z0-9_-]+'
};

export const SIGN_IN_FIELDS = [
  {
    name: 'login',
    label: 'Логин',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.LOGIN,
    minlength: 3,
    maxlength: 20,
  },
  {
    name: 'password',
    label: 'Пароль',
    type: INPUT_TYPES.PASSWORD,
    required: true,
    pattern: PATTERNS.BOTH,
    minlength: 8,
    maxlength: 40,
  },
];

export const USER_FIELDS = [
  {
    name: 'email',
    label: 'Почта',
    type: INPUT_TYPES.EMAIL,
    required: true,
    pattern: PATTERNS.EMAIL,
  }, {
    name: 'login',
    label: 'Логин',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.BOTH,
    minlength: 3,
    maxlength: 20,
  }, {
    name: 'display_name',
    label: 'Имя для отображения',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.NAMES,
  }, {
    name: 'first_name',
    label: 'Имя',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.NAMES,
  }, {
    name: 'second_name',
    label: 'Фамилия',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.NAMES,
  }, {
    name: 'phone',
    label: 'Телефон',
    type: INPUT_TYPES.TEL,
    required: true,
    pattern: PATTERNS.PHONE,
    minlength: 10,
    maxlength: 15,
  }, {
    name: 'password',
    label: 'Пароль',
    type: INPUT_TYPES.PASSWORD,
    pattern: PATTERNS.BOTH,
    minlength: 8,
    maxlength: 40,
  }, {
    name: 'password_confirm',
    label: 'Пароль (еще раз)',
    type: INPUT_TYPES.PASSWORD,
    pattern: PATTERNS.BOTH,
    minlength: 8,
    maxlength: 40,
  },
];

export const CHAT_NEW_MESSAGE_FIELDS = [
  {
    name: 'attachment',
    label: '📎',
    type: INPUT_TYPES.FILE,
    required: false,
  },
  {
    name: 'message',
    label: 'Сообщение',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.BOTH,
  },
];

export const USER_SEARCH_FIELDS = [
  {
    name: 'login',
    label: 'Логин пользователя',
    type: INPUT_TYPES.TEXT,
    required: false,
  }
];
