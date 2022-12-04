import Block from "../../utils/Block";
import { IForm } from "../../types";
import template from './Form.hbs';
import Field from '../Field';
import Button from '../Button';

export default class Form extends Block {
  constructor(props: IForm) {
    super('form', props);

    this.mapFields = this.mapFields.bind(this);
  }

  mapFields(fields) {
    return fields.reduce((handled, currentField) => {
      return {
        ...handled,
        [currentField.name]: new Field({
          ...currentField,
          events: {
            click: () => console.log('Works'),
          },
        }),
      }
    }, {});
  }

  render() {
    const { fields, buttonLabel, ...restProps } = this.props;
    return this.renderTemplate(template, {
      ...restProps,
      ...this.mapFields(fields),
      button: new Button({
        label: buttonLabel,
        type: 'submit',
        class: 'button',
      }),
    });
  }
}
