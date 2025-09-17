import { html } from "lit";
import "icare-components"; // Ensure this resolves to your built components

const sampleCaregivers = [
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" },
  { imgSrc: "/profile-image-1.jpg" }
];

export default {
  title: "Components/ICare Recommended Caregivers Card",
  component: "icare-recommended-caregivers-card"
};

const Template = (args: any) =>
  html`<icare-recommended-caregivers-card .caregivers=${args.caregivers}>
      </icare-recommended-caregivers-card>`;

export const Multiple = Template.bind({});
Multiple.args = {
  caregivers: sampleCaregivers
};
