// icare-button.stories.ts
import { html } from 'lit';
import 'icare-components'; // make sure this resolves to your built Stencil components

export default {
  title: 'Components/ICare Hero New',
  component: 'icare-hero-new',
  // decorators: [
  //   (story) =>
  //     html`<div style="all: unset; height: 100vh; width: 100vw;">${story()}</div>`,
  // ],
};

const Template = () =>
  html`<icare-hero-new></icare-hero-new>`;

export const Default = Template.bind({});
// Default.args = {
//   overlayPosition: 'center',
//   imageSrc : 'images/heros/who-we-are.jpg'
// };
