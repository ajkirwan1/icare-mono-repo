import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "icare-header",
  styleUrl: "icare-header.scss",
  shadow: true
})
export class IcareHeader {
  @Prop() loggedIn = false;

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
              <li> <icare-button>Login</icare-button></li>
            </ul>
          </nav>
        </header>
      </Host>
    );
  }
}
