import { html } from "lit";
import "icare-components"; // Ensure this resolves to your built components

export default {
  title: "Components/ICare Modal",
  component: "icare-modal"
};

const Template = () =>
  html`<icare-modal></icare-modal>`;

export const Default = Template.bind({});

