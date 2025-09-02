// icare-button.stories.ts
import { html } from 'lit';
import 'icare-components'; // make sure this resolves to your built Stencil components

export default {
  title: 'Components/ICare Avatar',
  component: 'icare-avatar',
  // argTypes: {
  //   label: { control: 'text' },
  //   variant: { control: 'select', options: ['primary', 'secondary'] },
  //   size: { control: 'select', options: ['small', 'medium', 'large'] },
  // },
};

const Template = ({}) =>
  html`<icare-avatar></icare-avatar>`;

export const Default = Template.bind({});
Default.args = {};
