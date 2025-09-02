import { html } from 'lit';
import 'icare-components'; // Ensure this resolves to your built components

export default {
  title: 'Components/ICare Footer',
  component: 'icare-footer',
};

const Template = () =>
  html`<icare-footer></icare-footer>`;

export const Default = Template.bind({});
