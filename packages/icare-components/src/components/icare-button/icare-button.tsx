import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'icare-button',
  styleUrl: 'icare-button.scss',
  shadow: true,
})
export class IcareButton {
  @Prop() label = 'Click';
  @Prop({ reflect: true }) variant: 'primary' | 'secondary' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() href: string;
  @Prop() target?: '_self' | '_blank' = '_self';

  render() {
    const content = <slot>{this.label}</slot>;

    if (this.href) {
      // render as anchor to preserve native navigation behavior
      return (
        <Host>
          <a class="button" href={this.href} target={this.target}>
            {content}
          </a>
        </Host>
      );
    }
    return (
      <Host>
      <button>
        <slot>{this.label}</slot>
      </button>
      </Host>
    );
  }
}
