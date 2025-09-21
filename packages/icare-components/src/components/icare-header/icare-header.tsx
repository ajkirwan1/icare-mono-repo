import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "icare-header",
  styleUrl: "icare-header.scss",
  shadow: true
})
export class IcareHeader {
  // @Prop() loggedIn = false;

  render() {
    return (
      <Host>
        <header>
          <div>
            <icare-logo />
          </div>
          <nav>
            <ul>
              <slot name="nav-links" />
              <slot name="header-buttons" />
              <slot name="header-avatar" />
            </ul>
          </nav>
        </header>
      </Host>
    );
  }
}
