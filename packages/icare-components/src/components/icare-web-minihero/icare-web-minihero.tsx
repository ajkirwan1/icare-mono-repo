import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'icare-web-minihero',
  styleUrl: 'icare-web-minihero.scss',
  shadow: true,
})
export class IcareWebMinihero {

  @Prop() imgSrc: string;
  @Prop() imgAlt = 'Mini Hero Title';
  @Prop() href: string;

  render() {
    return (
      <Host>
        <section>
          <img src={this.imgSrc} alt={this.imgAlt} />
          <div class="overlay" />
          <div class="content">
            <h3>
              <slot name="header"></slot>
            </h3>
            <icare-button variant='secondary' href={this.href}><slot name="text"></slot></icare-button>
          </div>
        </section>
      </Host>
    );
  }
}
