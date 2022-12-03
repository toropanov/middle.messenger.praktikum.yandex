export const API_URL = 'http://localhost:1234';

export const HTTP_REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const AUTH_LOCALSTORAGE_KEY = 'ya-authorized';

export const PAGE_PATHS = {
  'MAIN': '/',
  'CHAT': '/chat',
  'AUTH': '/auth/',
  'SIGN_IN': '/auth/sign_in',
  'SIGN_UP': '/auth/sign_up',
  'PROFILE': '/profile',
  'PROFILE_EDIT': '/profile/edit',
  'EDIT_PASSWORD': '/profile/edit/password',
  '404': '/404',
  '500': '/500',
  'ERROR': '/404'
};

export const INPUT_TYPES = {
  TEXT: 'text',
  PASSWORD: 'password',
  TEL: 'tel',
  EMAIL: 'email'
};

const PATTERNS = {
  LETTERS: '[A-Za-z]+',
  NUMBERS: '[0-9]+',
  BOTH: '[A-Za-z0-9]+',
  EMAIL: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
}

export const SIGN_IN_FIELDS = [
  {
    name: 'login',
    label: 'Логин',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.LETTERS
  },
  {
    name: 'password',
    label: 'Пароль',
    type: INPUT_TYPES.PASSWORD,
    required: true,
    pattern: PATTERNS.BOTH,
  }
];

export const USER_FIELDS = [
  {
    name: 'email',
    label: 'Почта',
    type: INPUT_TYPES.EMAIL,
    required: true,
    pattern: PATTERNS.EMAIL,
  },{
    name: 'login',
    label: 'Логин',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.LETTERS,
  },{
    name: 'first_name',
    label: 'Имя',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.LETTERS,
  },{
    name: 'second_name',
    label: 'Фамилия',
    type: INPUT_TYPES.TEXT,
    required: true,
    pattern: PATTERNS.LETTERS,
  },{
    name: 'phone',
    label: 'Телефон',
    type: INPUT_TYPES.TEL,
    required: true,
    pattern: PATTERNS.NUMBERS,
  },{
    name: 'password',
    label: 'Пароль',
    type: INPUT_TYPES.PASSWORD,
    required: true,
    pattern: PATTERNS.BOTH,
  },{
    name: 'password_confirm',
    label: 'Пароль (еще раз)',
    type: INPUT_TYPES.PASSWORD,
    required: true,
    pattern: PATTERNS.BOTH,
  }
];


