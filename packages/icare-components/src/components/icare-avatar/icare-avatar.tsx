import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "icare-avatar",
  styleUrl: "icare-avatar.scss",
  shadow: true
})



export class IcareAvatar {

  @Prop() imgSrc: string;
  @Prop() imgAlt: string;
  render() {
    return (
      <Host>
        <img src={this.imgSrc} alt={this.imgAlt} class="image-wrapper" />
      </Host>
    );
  }
}
