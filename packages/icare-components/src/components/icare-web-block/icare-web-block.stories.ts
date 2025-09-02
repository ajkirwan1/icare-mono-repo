import { html } from 'lit';
import 'icare-components'; // Ensure this resolves to your built components

export default {
  title: 'Components/ICare Web Block',
  component: 'icare-web-block',
};

const Template = ({imgSrc, layout}) =>
  html`<icare-web-block .imgSrc=${imgSrc} .layout=${layout}>

          <span slot="header-contents">Care coordination made clear.</span>

          <span slot="body-contents">ICare helps teams and families keep critical care information organized, current, and accessible—so attention stays where it matters most.</span>
      </icare-web-block>`;

export const Default = Template.bind({});
Default.args = {
  imgSrc : 'images/heros/who-we-are.jpg'
};

export const TextRight = Template.bind({});
TextRight.args = {
  imgSrc : 'images/heros/who-we-are.jpg',
  layout: 'text-right'
};

export const TextTop = Template.bind({});
TextTop.args = {
  imgSrc : 'images/heros/who-we-are.jpg',
  layout: 'text-top'
};

export const TextBottom = Template.bind({});
TextBottom.args = {
  imgSrc : 'images/heros/who-we-are.jpg',
  layout: 'text-bottom'
};

