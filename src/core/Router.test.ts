import Router from './Router';
import Block from '../core/Block';
import { Routes } from '../types';

jest.mock("nanoid", () => {
  return { nanoid: () => null };
});

class MockPage extends Block {
  static componentName = 'MockPage';

  render() {
    return this.renderTemplate(() => '', {});
  }
}

describe('Router', () => {
  it('Get mock page', () => {
    Router
      .use(Routes.MAIN, MockPage)
      .start();

    const mainRoute = Router.getRoute(Routes.MAIN);
    expect(Router.routes[0]).toBe(mainRoute);
  });

  it('History record main page open', () => {
    Router
      .use(Routes.MAIN, MockPage)
      .start();

    expect(Router.history.length).toBe(1);
  });

  it('History recorded 3 goes', () => {
    Router
      .use(Routes.MAIN, MockPage)
      .start();
      
    Router.go(Routes.MAIN);
    Router.go(Routes.MAIN);

    expect(Router.history.length).toBe(3);
  });
});
