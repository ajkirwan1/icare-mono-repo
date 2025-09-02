import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'icare-logo',
  styleUrl: 'icare-logo.scss',
  shadow: true,
})
export class ICareLogo {
  render() {
    return (
      <Host>
       <a class="icare-logo__link" href="/" aria-label="Home" target='_self'>
         <img src="/images/icare-logo.svg" alt="iCare Logo" />
       </a>
      </Host>
    );
  }
}
