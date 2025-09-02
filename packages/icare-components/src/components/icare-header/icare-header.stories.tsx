import { html } from 'lit';
import 'icare-components'; // Ensure this resolves to your built components

export default {
  title: 'Components/ICare Header',
  component: 'icare-header',
  argTypes: {
    loggedIn: {
      control: 'boolean',
      description: 'Controls whether the user is logged in',
    },
  },
};

const Template = ({ loggedIn }) =>
  html`<icare-header logged-in=${loggedIn}></icare-header>`;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  loggedIn: false,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loggedIn: true,
};
