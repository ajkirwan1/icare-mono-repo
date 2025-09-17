import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "icare-caregiver-mini-profile-card",
  styleUrl: "icare-caregiver-mini-profile-card.scss",
  shadow: true
})


export class IcareCaregiverMiniProfileCard {

  @Prop() imgSrc: string;
  @Prop() imgAlt?: string;

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
            <h2>Jane Doe</h2>
            <p>Primary Caregiver</p>
            <p>Primary Caregiver</p>
            <p>Primary Caregiver</p>
            <p>Primary Caregiver</p>
          </div>
        </div>
      </Host>
    );
  }
}
