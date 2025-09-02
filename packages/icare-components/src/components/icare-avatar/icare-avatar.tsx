import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'icare-avatar',
  styleUrl: 'icare-avatar.scss',
  shadow: true,
})

export class IcareAvatar {
  render() {
    return (
      <Host>
          <img src="images/avatar-image.jpg" alt="iCare Logo" class="image-wrapper"/>
      </Host>
    );
  }
}
