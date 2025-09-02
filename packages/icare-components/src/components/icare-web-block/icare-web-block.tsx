import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'icare-web-block',
  styleUrl: 'icare-web-block.scss',
  shadow: true,
})
export class IcareWebBlock {

  @Prop() imgSrc: string;
  @Prop() imgAlt: string;

  @Prop({ reflect: true }) layout: 'text-left' | 'text-right' | 'text-top' | 'text-bottom'  = 'text-left';

  render() {

    return (
      <Host>
          <div class="text-wrapper">
            <div>
              <h2><slot name="header-contents"></slot></h2>
              <p><slot name="body-contents"></slot></p>
            </div>
            <div class="button-group">
              <icare-button variant='primary'>Get Started</icare-button>
              <icare-button variant='secondary'>More Information</icare-button>
            </div>
          </div>
          <figure>
            <img src={this.imgSrc} alt={this.imgAlt}></img>
        </figure>
      </Host>
    );
  }
}
