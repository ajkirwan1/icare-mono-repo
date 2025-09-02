// icare-button.stories.ts
import { html } from 'lit';
import 'icare-components'; // make sure this resolves to your built Stencil components

export default {
  title: 'Components/ICare Button',
  component: 'icare-button',
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};

const Template = ({ label, variant, size }) =>
  html`<icare-button label=${label} variant=${variant} size=${size}></icare-button>`;

export const Default = Template.bind({});
Default.args = {
  label: 'Click Me',
  variant: 'primary',
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Cancel',
  variant: 'secondary',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Continue',
  variant: 'primary',
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Okay',
  variant: 'primary',
  size: 'small',
};
