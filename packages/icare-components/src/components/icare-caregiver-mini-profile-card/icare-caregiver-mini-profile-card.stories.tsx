import { html } from "lit";
import "icare-components"; // Ensure this resolves to your built components

export default {
  title: "Components/ICare Caregiver Mini Profile Card",
  component: "icare-caregiver-mini-profile-card"
};

const Template = ({ imgSrc, imgAlt }) =>
  html`<icare-caregiver-mini-profile-card .imgSrc=${imgSrc} .imgAlt=${imgAlt}>
</icare-caregiver-mini-profile-card>`;

export const Default = Template.bind({});

Default.args = {
  imgSrc: "/images/profile-image-1.jpg", // Ensure this file exists under public/images/
  imgAlt: "Profile picture of Nurse Mary"
};
