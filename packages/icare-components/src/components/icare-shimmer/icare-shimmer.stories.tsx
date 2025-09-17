// shimmer-loader.stories.ts
import { html } from "lit";
import "icare-components"; // make sure this resolves to your built Stencil components

export default {
  title: "Components/Shimmer Loader",
  component: "icare-shimmer"
};

const Template = ({ width, height }) =>
  html`<icare-shimmer width=${width} height=${height}></icare-shimmer>`;

export const Default = Template.bind({});
Default.args = {
  width: "200px",
  height: "20px"
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  width: "100%",
  height: "40px"
};

export const Circle = Template.bind({});
Circle.args = {
  width: "50px",
  height: "50px"
};
