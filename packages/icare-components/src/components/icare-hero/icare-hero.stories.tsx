// icare-button.stories.ts
import { html } from 'lit';
import 'icare-components'; // make sure this resolves to your built Stencil components

export default {
  title: 'Components/ICare Hero',
  component: 'icare-hero',
  decorators: [
    (story) =>
      html`<div style="all: unset; height: 100vh; width: 100vw;">${story()}</div>`,
  ],
};

const Template = ({ overlayPosition, imageSrc }) =>
  html`<icare-hero
        .overlayPosition=${overlayPosition}
        .imageSrc=${imageSrc}>
        <div slot="overlay">
          <p><strong>Simple</strong></p>
          <p><strong>Transparent</strong></p>
          <p><strong>Secure</strong></p>
          <p>ICare connects seniors, caregivers, and families in one trusted place</p>
        </div>
      </icare-hero>`;

export const Center = Template.bind({});
Center.args = {
  overlayPosition: 'center',
  imageSrc : 'images/heros/who-we-are.jpg'
};

export const Top = Template.bind({});
Top.args = {
  overlayPosition: 'top',
};

export const Bottom = Template.bind({});
Bottom.args = {
  overlayPosition: 'bottom',
};

// Make sure the component runs full screen in Storybook
Center.parameters =
  Top.parameters =
  Bottom.parameters = {
    layout: 'fullscreen',
  };
