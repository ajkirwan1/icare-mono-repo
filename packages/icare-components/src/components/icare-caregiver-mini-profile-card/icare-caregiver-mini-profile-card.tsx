import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core";

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
  @Prop() id?: string;

  @Event() navigate: EventEmitter<string>;

  private get navigateTo(): string {
    return `caregivers/${this.id}`;
  }


  private onHostClick() {
    const url = this.navigateTo;
    this.navigate.emit(url);
  }

  private onHostKeyDown = (e: KeyboardEvent) => {
    if (!this.navigateTo) { return; }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.navigate.emit(this.navigateTo);
    }
  };


  render() {
    return (
      <Host
        onClick={this.onHostClick}
        onKeyDown={this.onHostKeyDown}
      >
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
