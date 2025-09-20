// icare-button.stories.ts
import { html } from "lit";
import "icare-components"; // make sure this resolves to your built Stencil components
import { fn } from "storybook/test";

export default {
  title: "Components/ICare Button",
  component: "icare-button",
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["small", "medium", "large"] }
  },
  args: { onClick: fn() }
};

const Template = ({ label, variant, size }) =>
  html`<icare-button label=${label} variant=${variant} size=${size}></icare-button>`;

export const Default = Template.bind({});
Default.args = {
  label: "Click Me",
  variant: "primary",
  size: "medium"
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Cancel",
  variant: "secondary",
  size: "medium"
};

export const Large = Template.bind({});
Large.args = {
  label: "Continue",
  variant: "primary",
  size: "large"
};

export const Small = Template.bind({});
Small.args = {
  label: "Okay",
  variant: "primary",
  size: "small"
};

const HrefTemplate = ({ label, variant, size, href, target }) =>
  html`<icare-button
       label=${label}
       variant=${variant}
       size=${size}
       href=${href}
       target=${target || "_self"}
     ></icare-button>`;

export const HrefButton = HrefTemplate.bind({});
HrefButton.args = {
  label: "Login",
  variant: "secondary",
  href: "https://example.com"
};
