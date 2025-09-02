import { html } from 'lit';
import 'icare-components'; // Make sure this imports the compiled custom elements: icare-page, icare-header, icare-caregiver-profile-card
// Using public folder path directly to avoid TS module resolution error for image assets.

export default {
  title: 'Layouts/ICare Page',
  component: 'icare-page',
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = () => html`
  <icare-page>
  <icare-section>
   <icare-web-block img-src="/images/web-cards/web-card-image-1.jpg" layout="text-right" >
        <span slot="header-contents">Care coordination made clear.</span>
        <span slot="body-contents">ICare helps teams and families keep critical care information organized, current, and accessible—so attention stays where it matters most.</span>
    </icare-web-block>
  </icare-section>

  <icare-section>
    <icare-web-block img-src="/images/web-cards/web-card-image-2.jpg" layout="text-top" >
        <span slot="header-contents">Care coordination made clear.</span>
        <span slot="body-contents">ICare helps teams and families keep critical care information organized, current, and accessible—so attention stays where it matters most.</span>
    </icare-web-block>
  </icare-section>
  <icare-section>
    <div style="display: flex; gap: 2rem;">
      <icare-web-block img-src="/images/web-cards/web-card-image-3.jpg" layout="text-bottom" >
          <span slot="header-contents">Care coordination made clear.</span>
          <span slot="body-contents">ICare helps teams and families keep critical care information organized, current, and accessible—so attention stays where it matters most.</span>
      </icare-web-block>
          <icare-web-block img-src="/images/web-cards/web-card-image-2.jpg" layout="text-bottom" >
          <span slot="header-contents">Care coordination made clear.</span>
          <span slot="body-contents">ICare helps teams and families keep critical care information organized, current, and accessible—so attention stays where it matters most.</span>
      </icare-web-block>
          </icare-web-block>
          <icare-web-block img-src="/images/web-cards/web-card-image-1.jpg" layout="text-bottom" >
          <span slot="header-contents">Care coordination made clear.</span>
          <span slot="body-contents">ICare helps teams and families keep critical care information organized, current, and accessible—so attention stays where it matters most.</span>
      </icare-web-block>
    </div>
    </icare-section>
    <icare-section class="full-bleed">
      <icare-banner class="full-bleed" img-src="/images/heros/who-we-are.jpg" img-alt="Banner Image"></icare-banner>
    </icare-section>
     <icare-section>
     <div style="display: flex; gap: 2rem;">
      <icare-web-minihero img-src="/images/heros/hero-landing-page.jpg" image-alt="Mini Hero Title1111">
        <span slot="header">ICare for Caregivers</span>
        <span slot="text">This is some additional text to support the mini hero title.</span>
      </icare-web-minihero>
      <icare-web-minihero img-src="/images/web-cards/web-card-image-4.jpg" image-alt="Mini Hero Title">
        <span slot="header">ICare for Carereceivers</span>
        <span slot="text">This is some additional text to support the mini hero title.</span>
      </icare-web-minihero>
    </div>
    </icare-section>
  </icare-page>
`;

export const Default = Template.bind({});
