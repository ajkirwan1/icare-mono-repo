import { Component, Host, h  } from '@stencil/core';

@Component({
  tag: 'icare-page',
  styleUrl: 'icare-page.scss',
  shadow: true,
})
export class IcarePage {
  render() {
    return (
      <Host>
        <slot name="hero-content"></slot>
        <main>
          <div class="content">
            <slot></slot>
          </div>
        </main>
        <icare-footer></icare-footer>
      </Host>
    );
  }
}
