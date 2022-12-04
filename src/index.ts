import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Auth from './pages/Auth';
import Error from './pages/Error';

import { PAGE_PATHS } from './consts';

const pageTemplate = (path: string) => (() => {
  switch (path) {
    case PAGE_PATHS.CHAT:
      return new Chat();
    case PAGE_PATHS.MAIN:
    case PAGE_PATHS.AUTH:
    case PAGE_PATHS.SIGN_IN:
      return new Auth({ isMember: true });
    case PAGE_PATHS.SIGN_UP:
      return new Auth({ isMember: false });
    case PAGE_PATHS.PROFILE:
      return new Profile({ isEditable: false });
    case PAGE_PATHS.PROFILE_EDIT:
      return new Profile({ isEditable: true });
    case PAGE_PATHS.EDIT_PASSWORD:
      return new Profile({ isEditable: true });
    default:
      return new Error();
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  const root:HTMLElement | null = document.querySelector('#app');
  const path:string = window.location.pathname; // TODO: Add auto redirect if authorized

  const template = pageTemplate(path);
  if (root) {
    root.append(template.getContent());
  }
});
