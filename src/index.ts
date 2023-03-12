import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Auth } from './pages/Auth';
import { Error } from './pages/Error';

import Router from './core/Router';
import { Routes } from './types';

import "./styles.scss";

window.addEventListener('DOMContentLoaded', () => {
  Router
    .use(Routes.MAIN, Auth)
    .use(Routes.CHAT, Chat)
    .use(Routes.PROFILE, Profile)
    .use(Routes.ERROR, Error)
    .start();
});
