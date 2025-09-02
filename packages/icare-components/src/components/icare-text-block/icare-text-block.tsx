import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'icare-text-block',
  styleUrl: 'icare-text-block.scss',
  shadow: true,
})
export class IcareTextBlock {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
