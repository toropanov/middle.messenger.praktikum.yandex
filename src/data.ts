// eslint-disable-next-line max-len
const avatarUrl = 'https://img.freepik.com/free-vector/cute-mummy-gaming-cartoon-illustration-halloween-gaming-icon-concept_138676-1889.jpg?w=1380&t=st=1668431466~exp=1668432066~hmac=2f771042510842c2850d8d1f0f5781d1e1b06edc9010752936eedb809ef1cffc';

export const user = {
  id: 0,
  email: 'ivanivanov@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  phone: '79340000000',
  avatar_url: avatarUrl,
};

export const chains = [
  {
    id: 1,
    user: 'Киноклуб',
    last_message: 'One',
    updated_at: '10:39',
    unread_count: 12,
    avatar_url: avatarUrl,
  },
  {
    id: 2,
    user: 'Путешествия',
    last_message: 'Two',
    updated_at: '10:39',
    unread_count: 1,
    avatar_url: avatarUrl,
  },
];

export const messages = {
  1: [
    {
      direction: 0,
      user: 0,
      text: 'NEWEST',
    },
    {
      direction: 1,
      user: 1,
      text: '321',
    },
    {
      direction: 1,
      user: 1,
      text: '321',
    },
    {
      direction: 1,
      user: 1,
      text: '321',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 1,
      user: 1,
      text: '321',
    },
    {
      direction: 1,
      user: 1,
      text: '321',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 0,
      user: 0,
      text: '123',
    },
    {
      direction: 1,
      user: 1,
      text: '321',
    },
    {
      direction: 1,
      user: 1,
      text: 'LATEST',
    },
  ],
  2: [
    {
      direction: 1,
      user: 0,
      text: '321',
    },
    {
      direction: 0,
      user: 1,
      text: '123',
    },
  ],
};
