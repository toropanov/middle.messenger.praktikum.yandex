import { Profile } from './pages/Profile';
import input from './partials/input.hbs';
import button from './partials/button.hbs';
import field from './partials/field.hbs';
import popup from './partials/popup.hbs';

import Handlebars from 'handlebars/dist/handlebars.runtime';

window.addEventListener('DOMContentLoaded', () => {
  Handlebars.registerPartial('input', input);
  Handlebars.registerPartial('button', button);
  Handlebars.registerPartial('field', field);
  Handlebars.registerPartial('popup', popup);

  const root = document.querySelector('#app');

  const profilePage = new Profile();

  console.log({ profilePage }, profilePage.getContent());
  root!.append(profilePage.getContent()!);
});
  