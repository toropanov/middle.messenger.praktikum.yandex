import Block from "./Block";
import { IState } from "../types";

export default class Route {
  private _pathname: string;
  private _blockClass: string;
  private _block: typeof Block | null;
  private _props: IState;

  constructor(pathname: string, view: string, props: IState) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
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
    if (!this._block) {
      this._block = new this._blockClass();

      const root = document.querySelector('#app');
      root!.innerHTML = '';
      root!.appendChild(this._block.element);

      return;
    }

    // this._block.show();
  }
}
