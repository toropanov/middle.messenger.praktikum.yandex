import chatTemplate from './pages/chat/index.hbs';
import signInTemplate from './pages/Profile/sign_in.hbs';
import signUpTemplate from './pages/Profile/sign_up.hbs';
import accountViewTemplate from './pages/Profile/view.hbs';
import accountEditTemplate from './pages/Profile/edit.hbs';
import passwordTemplate from './pages/Profile/password.hbs';
import errorTemplate from './pages/Error/index.ts';

import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';

import input from './partials/input.hbs';
import button from './partials/button.hbs';
import field from './partials/field.hbs';
import popup from './partials/popup.hbs';

import Handlebars from 'handlebars/dist/handlebars.runtime';

const PAGES = {
  'chat': chatTemplate,
  'sign_in': signInTemplate,
  'sign_up': signUpTemplate,
  'account': accountViewTemplate,
  'edit_account': accountEditTemplate,
  'password': passwordTemplate,
  'error': errorTemplate,
} 

function renderPage(pageName) {
  const root = document.querySelector('#app');
  const template = PAGES[pageName];

  const compiled = template();

  root.innerHTML = compiled;
}

function togglePopup(data) {
  const root = document.querySelector('#popup');

  if (!data) {
    root.innerHTML = '';
  }

  const compiled = popup({
    title: data.title
  });

  root.innerHTML = compiled;
}

window.renderPage = renderPage;
window.togglePopup = togglePopup;

document.addEventListener('DOMContentLoaded', () => {
  Handlebars.registerPartial('input', input);
  Handlebars.registerPartial('button', button);
  Handlebars.registerPartial('field', field);
  Handlebars.registerPartial('popup', popup);

  renderPage('sign_in'); // Initial page
});
