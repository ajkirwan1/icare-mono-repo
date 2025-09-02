import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'icare-caregiver-profile-card',
  styleUrl: 'icare-caregiver-profile-card.scss',
  shadow: true,
})
export class IcareCaregiverProfileCard {
  @Prop() cardTitle: string;
  @Prop() imageSrc: string;
  @Prop() imageAlt: string;
  @Prop() description: string;
  @Prop() shortBio: string;
  @Prop() features: string[] = [];

  render() {
    return (
      <Host>
        <article class="card">
          <header class="card-header">
            {this.imageSrc && (
              <figure class="card-image">
                <img src={this.imageSrc} alt={this.imageAlt} />
              </figure>
            )}
            <div>
              <h2 class="card-title">{this.cardTitle}</h2>
              <ul>
                {this.features.map(feature => (
                  <li>{feature}</li>
                ))}
              </ul>
            </div>
          </header>
          <section class="card-body">
            <p>{this.shortBio}</p>
          </section>
          <footer class="card-footer">
            {/* <slot name="footer"></slot> */}
            <icare-button></icare-button>
          </footer>
        </article>
      </Host>
    );
  }
}
