import Block from '../../utils/Block';
import ProfileTemplate from './Profile.hbs';

import Form from '../../components/Form';

import { USER_FIELDS } from '../../consts';
import { user } from '../../data';

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
    const readOnly = !isEditable;
    const fields = readOnly ? USER_FIELDS.map(field => ({ ...field, readOnly })) : USER_FIELDS;

    return this.renderTemplate(ProfileTemplate, {
      readOnly,
      user,
      inputs: new Form({
        buttonLabel: 'Сохранить',
        events: {
          submit: (ev) => this.handleSave(ev),
        },
        fields,
        readOnly,
      }),
    });
  }
}
