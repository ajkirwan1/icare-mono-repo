import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "icare-hero-new",
  styleUrl: "icare-hero-new.scss",
  shadow: true
})

export class IcareHeroNew {

  @Prop() imageSrc = "images/heros/hero-landing-page.jpg";
  @Prop() imgAlt = "iCare hero image";

  render() {
    return (
      <Host>
        <section aria-label="Caregivers hero">
          <img src={this.imageSrc} alt="Care coordination background" />
          <div class='hero-overlay' />
          <div class='icare-header' >
            <icare-header>
              <slot name="nav-links" slot="nav-links" />
              <slot name="header-buttons" slot="header-buttons" />
            </icare-header>
          </div>
          <div class='content'>
            <h1><slot name='header-content' /></h1>
            <h2>
              <slot name='subheader-content' />
            </h2>
            <div class='cta'>
              <icare-button variant='primary'>Get Started</icare-button>
              <icare-button variant='secondary'>More Information</icare-button>
            </div>
          </div>
        </section>
      </Host>
    );
  }
}
