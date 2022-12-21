import { Profile } from './pages/Profile';
import Chat from './pages/Chat';
import Auth from './pages/Auth';

import Router from './core/Router';
import { Routes } from './types';

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use(Routes.MAIN, new Auth({ isMember: true }))
    .use(Routes.CHAT, new Chat({ chatID: 1 }))
    .use(Routes.PROFILE, new Profile({ isEditable: true }))
    .start();
});
