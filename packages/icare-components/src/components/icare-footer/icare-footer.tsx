import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'icare-footer',
  styleUrl: 'icare-footer.scss',
  shadow: true,
})
export class IcareFooter {
  render() {
    return (
      <Host>
        <footer>
          <ul>
            <li><stencil-route-link url="/who-we-are">Who We Are</stencil-route-link></li>
            <li><stencil-route-link url="/how-it-works">How It Works</stencil-route-link></li>
            <li><stencil-route-link url="/privacy">Privacy</stencil-route-link></li>
          </ul>
          <div style={{ marginTop: '.75rem' }}>
            © {new Date().getFullYear()} ICare. All rights reserved.
          </div>
        </footer>
      </Host>
    );
  }
}
