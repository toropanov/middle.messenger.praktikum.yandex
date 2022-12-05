import Block from '../../utils/Block';
import template from './Form.hbs';
import { Field } from '../Field';
import { Button } from '../Button';

export class Form extends Block {
  constructor(props: Record<string, unknown> = {}) {
    super('form', props);

    this.mapFields = this.mapFields.bind(this);
  }

  mapFields(fields: Record<string, unknown>[]) {
    return fields.reduce((handled, currentField) => ({
      ...handled,
      [currentField.name as string]: new Field({
        ...currentField,
      }),
    }), {});
  }

  render() {
    const { fields, buttonLabel, ...restProps } = this.props;
    return this.renderTemplate(template, {
      ...restProps,
      ...this.mapFields(fields as Record<string, unknown>[]),
      button: new Button({
        label: buttonLabel,
        type: 'submit',
        class: 'button',
      }),
    });
  }
}
