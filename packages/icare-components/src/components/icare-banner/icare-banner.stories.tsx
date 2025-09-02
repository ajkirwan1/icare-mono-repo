import { html } from 'lit';
import 'icare-components'; // make sure this resolves to your built Stencil components

export default {
  title: 'Components/ICare Banner',
  component: 'icare-banner',
};

const Template = ({ imgSrc, imgAlt }) =>
  html`<icare-banner .imgSrc=${imgSrc} .imgAlt=${imgAlt}></icare-banner>`;

export const Default = Template.bind({});
Default.args = {
  imgSrc : 'images/heros/who-we-are.jpg'
};
