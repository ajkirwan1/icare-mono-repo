import { Component, h } from '@stencil/core';

@Component({
  tag: 'icare-section',
  styleUrl: 'icare-section.scss',
  shadow: true,
})
export class IcareSection {
  render() {
    return (
      <section class="section">
        <slot></slot>
      </section>
    );
  }
}
