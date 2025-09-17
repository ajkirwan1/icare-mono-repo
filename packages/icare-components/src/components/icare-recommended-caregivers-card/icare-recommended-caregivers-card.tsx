import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "icare-recommended-caregivers-card",
  styleUrl: "icare-recommended-caregivers-card.scss",
  shadow: true
})
export class IcareRecommendedCaregiversCard {

  @Prop() imgSrc: string;
  @Prop() altText: string;

  @Prop() caregivers: Array<{
    imgSrc: string;
    // imgAlt?: string;
    // name?: string;
    // role?: string;
  }> = [];

  private getItems() {
    // Fallback: if caregivers not provided but imgSrc is, build one entry
    if ((!this.caregivers || this.caregivers.length === 0) && this.imgSrc) {
      return [{ imgSrc: this.imgSrc }];
    }
    return this.caregivers;
  }

  render() {
    const items = this.getItems();
    return (
      <Host>
        <icare-card>
          <span slot="contents">
            <div class="header">
              <h2>Recommended Caregivers</h2>
              <p>Based on your preferences and requirements, we have identified the following caregivers that to suite your requirements</p>
            </div>
            <div class="caregiver-list">
              {items.map((c) => (
                <icare-caregiver-mini-profile-card
                  imgSrc={c.imgSrc}
                // imgAlt={c.imgAlt}
                // name={c.name}
                // role={c.role}
                // key={i}
                />
              ))}
            </div>
            <div class="card-footer">
              <span><a href="#">Send Message</a></span>
            </div>
          </span>
        </icare-card>
      </Host>
    );
  }
}
