# Yandex Practicum Task

[Swagger](https://ya-praktikum.tech/api/v2/swagger/)
[Socket](https://ya-praktikum.tech/api/v2/openapi/ws)

Разработка проекта в рамках обучения Яндекс Практикум.

## Установка

- `yarn start` — сборка и запуск проекта,
- `yarn dev` — запуск версии для разработчика,
- `yarn build` — сборка стабильной версии.

- `yarn stylelint` -  Проверка Stylelint
- `yarn eslint` — Проверка ESLint
- `yarn typescript` - Проверка TypeScript

- `yarn errors` - Проверка всех ошибок разом
✅ Все тесты проходят

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
