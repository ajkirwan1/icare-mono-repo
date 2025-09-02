import { Component, Host, h, Element, Prop, State } from '@stencil/core';

@Component({
  tag: 'icare-hero',
  styleUrl: 'icare-hero.scss',
  shadow: true,
})
export class IcareHero {
  @Element() el!: HTMLElement;

  /** Overlay position: 'top', 'center', 'bottom' */
  @Prop() overlayPosition: 'top' | 'center' | 'bottom' = 'center';

    /** Background hero image source */
  @Prop() imageSrc = 'images/heros/hero-landing-page.jpg';

  /** Alt text for accessibility */
  @Prop() imageAlt = 'iCare hero image';

  @State() headerHeight = 0;

  private headerObserver?: ResizeObserver;

  componentDidLoad() {
    // Measure after first paint
    requestAnimationFrame(() => {
      this.updateHeaderHeight();

      // Observe header for changes
      const headerEl = this.el.shadowRoot?.querySelector('.header') as HTMLElement;
      if (headerEl) {
        this.headerObserver = new ResizeObserver(() => this.updateHeaderHeight());
        this.headerObserver.observe(headerEl);
      }
    });
  }

  disconnectedCallback() {
    this.headerObserver?.disconnect();
  }

  private updateHeaderHeight() {
    const headerEl = this.el.shadowRoot?.querySelector('.header') as HTMLElement;
    if (headerEl) {
      const height = headerEl.offsetHeight;
      if (height !== this.headerHeight) {
        this.headerHeight = height;
        this.el.style.setProperty('--header-height', `${height}px`);
      }
    }
  }

  render() {
    return (
      <Host>
        <section>
          <img
            src={this.imageSrc}
            alt={this.imageAlt}
            class="image-wrapper"
          />
          <div class="header">
            <icare-header />
          </div>
          <div class={`hero-overlay ${this.overlayPosition}`}>
            <slot name="overlay"></slot>
          </div>
        </section>
      </Host>
    );
  }
}
