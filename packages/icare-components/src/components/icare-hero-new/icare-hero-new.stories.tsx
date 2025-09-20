// icare-button.stories.ts
import { html } from "lit";
import "icare-components"; // make sure this resolves to your built Stencil components
import { action } from "storybook/actions";

export default {
  title: "Components/ICare Hero New",
  component: "icare-hero-new"
};

const navLinks = [
  { to: "/who-we-are", text: "Who We Are" },
  { to: "/how-it-works", text: "How It Works" },
  { to: "/privacy", text: "Privacy" },
  { to: "/icare-for-caregivers", text: "ICare for Caregivers" },
  { to: "/icare-for-carereceivers", text: "ICare for Carereceivers" }
];

const Template = () =>
  html`<icare-hero-new>
${navLinks.map(
    (link) =>
      html`<li slot="nav-links">
      <a href="${link.to}">${link.text}</a>
    </li>`
  )}
    <li slot="header-buttons">
        <icare-button href='#' @click=${(e: Event) => { e.preventDefault(); action("login-click")(e); }}>Login</icare-button>
      </li>
    <span slot="header-content">ICare</span>
    <span slot="subheader-content">
      Learn more about ICare and our mission to connect caregivers and care receivers.
    </span>
  </icare-hero-new>`;

export const Default = Template.bind({});

