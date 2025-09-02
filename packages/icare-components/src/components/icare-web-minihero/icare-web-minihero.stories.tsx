import { html } from 'lit';
import 'icare-components'; // Ensure this resolves to your built components

export default {
  title: 'Components/ICare Web Minihero',
  component: 'icare-web-minihero',
};

const Template = () =>
  html`<icare-web-minihero img-src="/images/heros/hero-landing-page.jpg" image-alt="Mini Hero Title">
        <span slot="header">Mini Hero Title</span>
      </icare-web-minihero>`;

export const Default = Template.bind({});
