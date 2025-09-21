import { html } from "lit";
import "icare-components"; // Ensure this resolves to your built components
import { action } from "storybook/actions";

export default {
  title: "Components/ICare Header",
  component: "icare-header"
  // argTypes: {
  //   loggedIn: {
  //     control: "boolean",
  //     description: "Controls whether the user is logged in"
  //   }
  // }
};

const navLinks = [
  { to: "#", text: "Who We Are" },
  { to: "#", text: "How It Works" },
  { to: "#", text: "Privacy" },
  { to: "#", text: "ICare for Caregivers" },
  { to: "#", text: "ICare for Carereceivers" }
];

const Template = () =>
  html`<icare-header>
  ${navLinks.map(
    (link) =>
      html`<li slot="nav-links">
        <a href="${link.to}">${link.text}</a>
      </li>
      `
  )}
  <li slot="header-buttons">
        <icare-button href='#' @click=${(e: Event) => { e.preventDefault(); action("login-click")(e); }}>Login</icare-button>
      </li>
</icare-header>`;

export const Defualt = Template.bind({});


