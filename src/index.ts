import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Error } from './pages/Error';

import input from './partials/input.hbs';
import button from './partials/button.hbs';
import field from './partials/field.hbs';
import popup from './partials/popup.hbs';

import Handlebars from 'handlebars/dist/handlebars.runtime';

const pageTemplate = (path) => (()=>{
  switch (path) {
      case '/chat':
          return new Chat();
      case '/settings':
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
  const path = window.location.pathname;

  const template = pageTemplate(path);
  root.append(template.getContent());
});
