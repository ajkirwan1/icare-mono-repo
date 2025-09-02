import { html } from 'lit';
import 'icare-components'; // Ensure this correctly resolves your Stencil build output

export default {
  title: 'Components/ICare Caregiver Profile Card',
  component: 'icare-caregiver-profile-card',
  args: {
    cardTitle: 'Mary smith',
    imageSrc: '/images/profile-image-1.jpg', // Ensure this file exists under public/images/
    imageAlt: 'Profile picture of Nurse Mary',
    description: 'Compassionate caregiver with over 10 years of experience in home care.',
    shortBio: 'Nurse Mary is a dedicated and compassionate caregiver with over a decade of experience in home healthcare. She specializes in providing personalized support to elderly and chronically ill patients, ensuring comfort, dignity, and a high quality of life.',
    features: [
      '10+ years of experience in home healthcare',
      'Certified in elder care and chronic illness support',
      'Fluent in English and Spanish',
      'Trained in emergency response and medication management',
      'Available weekdays and weekends',
    ],
  },
  argTypes: {
    cardTitle: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    description: { control: 'text' },
    shortBio: { control: 'text' },
    features: { control: 'text' }
  },
};

const Template = ({ cardTitle, imageSrc, imageAlt, description, shortBio, features }) => html`
  <icare-caregiver-profile-card
    .cardTitle=${cardTitle}
    .imageSrc=${imageSrc}
    .imageAlt=${imageAlt}
    .description=${description}
    .shortBio=${shortBio}
    .features=${features}
  >
    <div slot="footer">
      <button>Contact</button>
    </div>
  </icare-caregiver-profile-card>
`;

export const Default = Template.bind({});

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  cardTitle: 'Temporary Staff',
  imageSrc: '',
  imageAlt: '',
  description: 'Please log in to view full caregiver profile details.',
};
