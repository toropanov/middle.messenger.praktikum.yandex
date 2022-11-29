import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Auth } from './pages/Auth';
import { Error } from './pages/Error';

import input from './partials/input.hbs';
import button from './partials/button.hbs';
import field from './partials/field.hbs';
import popup from './partials/popup.hbs';

import { PAGE_PATHS } from './consts';

import Handlebars from 'handlebars/dist/handlebars.runtime';

const isAuthorized = !!localStorage.getItem('ya-authorized');

const pageTemplate = (path) => (()=>{
  switch (path) {
      case PAGE_PATHS.MAIN:
      case PAGE_PATHS.CHAT:
        return new Chat();
      case PAGE_PATHS.AUTH:
        return new Auth(path);
      case PAGE_PATHS.PROFILE:
      case PAGE_PATHS.PROFILE_EDIT:
      case PAGE_PATHS.EDIT_PASSWORD:
        return new Profile(path);
      default:
        return new Error('404');
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  Handlebars.registerPartial('input', input);
  Handlebars.registerPartial('button', button);
  Handlebars.registerPartial('field', field);
  Handlebars.registerPartial('popup', popup);

  const root = document.querySelector('#app');
  const path = isAuthorized ? window.location.pathname : PAGE_PATHS.AUTH;

  const template = pageTemplate(path);
  root.append(template.getContent());
});
