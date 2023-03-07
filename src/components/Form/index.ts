import Block from '../../core/Block';
import template from './Form.hbs';
import { Field } from '../Field';
import { Button } from '../Button';
import { IForm, IInput } from '../../types';
import { BUTTON_TYPES } from '../../consts';

export class Form extends Block {
  constructor(props: IForm) {
    super('form', props);

    this.mapFields = this.mapFields.bind(this);
  }

  mapFields(fields:IInput[]) {
    return fields.reduce((handled, currentField) => ({
      ...handled,
      [currentField.name as string]: new Field({
        ...currentField,
      }),
    }), {});
  }

  render() {
    const { fields, buttonLabel, ...restProps } = this.props;
    const label = buttonLabel as string;
    return this.renderTemplate(template, {
      ...restProps,
      ...this.mapFields(fields as IInput[]),
      button: new Button({
        label,
        type: BUTTON_TYPES.SUBMIT,
        class: 'button',
      }),
    });
  }
}
