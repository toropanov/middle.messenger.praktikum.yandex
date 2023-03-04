import Block from "../../core/Block";
import template from './Chain.hbs';
import { IChain } from "../../types";

export class Field extends Block {
  constructor(props: IChain) {
    super('input', props);

  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
