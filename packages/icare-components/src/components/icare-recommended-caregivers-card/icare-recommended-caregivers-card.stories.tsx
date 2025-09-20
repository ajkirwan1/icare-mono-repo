import { html } from "lit";
import "icare-components"; // Ensure this resolves to your built components

export default {
  title: "Components/ICare Recommended Caregivers Card",
  component: "icare-recommended-caregivers-card",
  parameters: {
    mockData: [
      {
        url: "/api/recommended-caregivers",
        method: "GET",
        status: 200,
        response: [
          { imgSrc: "images/profile-image-1.jpg", name: "Jane Doe", imgAlt: "Profile picture of Jane Doe", bio: "Experienced caregiver with a passion for senior support.", profileId: "caregiver-001" },
          { imgSrc: "images/profile-image-4.jpg", name: "John Smith", imgAlt: "Profile picture of John Smith", bio: "Pediatric care specialist focused on holistic family support.", profileId: "caregiver-002" },
          { imgSrc: "images/profile-image-3.jpg", name: "Alice Johnson", imgAlt: "Profile picture of Alice Johnson", bio: "Companion caregiver who enjoys community activities.", profileId: "caregiver-003" },
          { imgSrc: "images/profile-image-5.jpg", name: "Bob Brown", imgAlt: "Profile picture of Bob Brown", bio: "Skilled in post-operative care and rehabilitation.", profileId: "caregiver-004" },
          { imgSrc: "images/profile-image-6.jpg", name: "Eve Davis", imgAlt: "Profile picture of Eve Davis", bio: "Specializes in dementia and Alzheimer's care.", profileId: "caregiver-005" },
          { imgSrc: "images/profile-image-7.jpg", name: "Charlie Wilson", imgAlt: "Profile picture of Charlie Wilson", bio: "Veteran caregiver with over 10 years of experience.", profileId: "caregiver-006" }
        ]
      }
    ]
  },
  decorators: [
    (story: any) => html`<div style="width: 80vw; border: 1px solid #ccc; padding: 16px;">
      ${story()}
    </div>`
  ]
};

const Template = () =>
  html`<icare-recommended-caregivers-card>
      </icare-recommended-caregivers-card>`;

export const Multiple = Template.bind({});
