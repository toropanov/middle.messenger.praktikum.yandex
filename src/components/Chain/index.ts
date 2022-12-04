import Block from "../../utils/Block";
import { IChain } from "../../types";
import template from './Chain.hbs';

export default class Field extends Block {
  constructor(props: IChain) {
    super('input', props);

  }

  render() {
    return this.renderTemplate(template, this.props);
  }
}
