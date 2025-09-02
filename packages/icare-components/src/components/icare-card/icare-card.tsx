import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'icare-card',
  styleUrl: 'icare-card.scss',
  shadow: true,
})
export class IcareCard {
  @Prop({ reflect: true }) variant: 'elevated' | 'outlined' = 'outlined';
  @Prop({ reflect: true }) interactive = false;
  render() {
    return (
      <Host>
        <div class="card__body">
          <slot name="contents"></slot>
        </div>
      </Host>
    );
  }
}
