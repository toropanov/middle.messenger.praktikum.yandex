import Block from '../../utils/Block';
import ProfileTemplate from './Profile.hbs';

import Form from '../../components/Form';

import { USER_FIELDS } from '../../consts';

export class Profile extends Block {
  constructor(props) {
    super('div', props);

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(ev) {
    ev.preventDefault();
    // BACKEND PART
  }

  render() {
    const { isEditable } = this.props;
    const fields = !isEditable ? USER_FIELDS.map(field => ({ ...field, readOnly: true })) : USER_FIELDS;

    return this.renderTemplate(ProfileTemplate, {
      readOnly: !isEditable,
      inputs: new Form({
        buttonLabel: 'Сохранить',
        events: {
          submit: (ev) => this.handleSave(ev),
        },
        fields,
        isEditable,
      }),
    });
  }
}
