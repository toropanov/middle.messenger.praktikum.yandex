# Yandex Practicum Task

[Netlify Preview](https://timely-tapioca-23b764.netlify.app)

[Swagger](https://ya-praktikum.tech/api/v2/swagger/)
[Socket](https://ya-praktikum.tech/api/v2/openapi/ws)

Разработка проекта в рамках обучения Яндекс Практикум.

## Установка

- `yarn start` — Сборка и запуск проекта
- `yarn build` — Сборка стабильной версии
- `yarn server` — Запуск сервера

- `yarn stylelint` -  Проверка Stylelint
- `yarn eslint` — Проверка ESLint
- `yarn typescript` - Проверка TypeScript

- `yarn errors` - Проверка всех ошибок разом
- `yarn tests` - Проверка Jest

✅ Все тесты проходят

# Docker

Для использования чата в докере потребуется собрать проект.

`docker build -t yandex/practicum .`

И далее запустить созданный контейнер.

`docker run -p 80:80 -d yandex/practicum`

# URL Страниц

```
  MAIN = '/',
  CHAT = '/messenger/',
  AUTH = '/auth/',
  PROFILE = '/settings/',
```

## TODO

- [ ] Сейчас страницы открываются при указание в урле /messenger/, нужно доделать, чтобы и для /messenger вхождение было. Также и для профиля.
- [x] авторизацию в полном объеме (регистрация, авторизация, выход из системы);
- [x] работу с информацией пользователя (изменять данные пользователя, изменять аватар, изменять пароль);
- [x] работу с чатами (список чатов пользователя, создать новый чат, добавить пользователя в чат, удалить пользователя из чата).

## Возможные ошибки

Если ругается на @parcel/transformer-sass, что он не той версии. Можно удалить node_modules, dist и кэш парсела и снова установить зависимости. Если совсем не помогает, то сменить на 2.7.0.

## Дополнительно

- [Дизайн в Figma](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1&t=hiTbvcfSm7jC5TVn-1)
