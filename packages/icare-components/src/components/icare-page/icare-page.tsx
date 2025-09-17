import { Component, Host, h  } from "@stencil/core";

@Component({
    tag: "icare-page",
    styleUrl: "icare-page.scss",
    shadow: true
})
export class IcarePage {
    render() {
        return (
          <Host>
            <slot name="hero-content" />
            <main>
              <div class="content">
                <slot />
              </div>
            </main>
            <icare-footer />
          </Host>
        );
    }
}
