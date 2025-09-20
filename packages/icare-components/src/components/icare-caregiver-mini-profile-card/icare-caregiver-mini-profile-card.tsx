import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "icare-caregiver-mini-profile-card",
  styleUrl: "icare-caregiver-mini-profile-card.scss",
  shadow: true
})


export class IcareCaregiverMiniProfileCard {

  @Prop() imgSrc: string;
  @Prop() imgAlt?: string;
  @Prop() name?: string;
  @Prop() bio?: string;

  render() {
    return (
      <Host>
        <div class='caregiver-mini-profile-card'>
          <figure>
            <img
              src={this.imgSrc}
              alt={this.imgAlt}
            />
          </figure>
          <div class='caregiver-info'>
            <h2>{this.name}</h2>
            <p>{this.bio}</p>
          </div>
        </div>
      </Host>
    );
  }
}
