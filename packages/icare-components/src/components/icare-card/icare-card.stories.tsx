import { html } from 'lit';
import 'icare-components'; // Ensure this resolves to your built components

export default {
  title: 'Components/ICare Card',
  component: 'icare-card',
};

const Template = ({ variant, interactive }) =>
  html`<icare-card variant=${variant} ?interactive=${interactive}>
          <div slot="contents">
          <p><strong>Simple</strong></p>
          <p><strong>Transparent</strong></p>
          <p><strong>Secure</strong></p>
          <p>ICare connects seniors, caregivers, and families in one trusted place</p>
        </div>
      </icare-card>`;

export const Default = Template.bind({});

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  interactive: true,
};

export const Elevated = Template.bind({});
Elevated.args = {
  variant: 'elevated',
  interactive: true,
};

export const Interactive = Template.bind({});
Interactive.args = {
  interactive: true,
};

export const Flat = Template.bind({});
Flat.args = {
  variant: 'flat',
};
