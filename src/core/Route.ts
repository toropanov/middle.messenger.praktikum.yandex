import { render } from './Block';

export default class Route {
  constructor(pathname: string, view, props) {
    console.log({ pathname, view });
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;

      const root = document.querySelector('#app');
      root!.innerHTML = '';
      root!.appendChild(this._block.element);
      console.log('RENDER', this._block, this._block.element)

      // render(this._props.rootQuery, this._block.ele);
      // console.log(renderTemplate);

      return;
    }

    this._block.show();
  }
}
