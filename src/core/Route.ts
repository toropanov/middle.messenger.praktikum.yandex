import Block from "./Block";

export default class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block;

  constructor(pathname: string, view: typeof Block) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block;
  }

  navigate(pathname: string) {
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
    this._block = new this._blockClass();

    const root = document.querySelector('#app');

    if (root) {
      root.innerHTML = '';
      root.appendChild(this._block.element);
    }

    return;
  }
}
