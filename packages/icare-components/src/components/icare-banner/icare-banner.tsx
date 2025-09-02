import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'icare-banner',
  styleUrl: 'icare-banner.scss',
  shadow: true,
})
export class IcareBanner {
  @Prop() imgSrc: string;
  @Prop() imgAlt: string;
  render() {
    return (
      <Host>
      <section aria-label="Hero">
        <img src={this.imgSrc} alt={this.imgAlt} />
        <div class='overlay' />
        <div class='content'>
          <h1>Care coordination made clear.</h1>
          <p>
            Keep essential care information organized, current, and accessible—so attention stays where it matters most.
          </p>
          <div class='cta-bar'>
            <icare-button variant='primary'>Get Started</icare-button>
            <icare-button variant='secondary'>Learn More</icare-button>
          </div>
        </div>
      </section>
      </Host>
    );
  }
}
