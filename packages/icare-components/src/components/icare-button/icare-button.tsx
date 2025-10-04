import { Component, Prop, Host, h, Element } from "@stencil/core";

@Component({
  tag: "icare-button",
  styleUrl: "icare-button.scss",
  shadow: true
})
export class IcareButton {
  @Prop() label = "Click";
  @Prop({ reflect: true }) variant: "primary" | "secondary" = "primary";
  @Prop() size: "small" | "medium" | "large" = "medium";
  @Prop() href: string;
  @Prop() target?: "_self" | "_blank" = "_self";
  @Prop() type?: "button" | "submit" | "reset" = "button";

  @Element() host: HTMLElement;

  @Prop() form?: string;
  // @Prop() form?: string;
  // @Prop() value?: string;

  // @Event() buttonClick: EventEmitter<void>;


  // private handleClick = (e: Event) => {
  //   this.buttonClick.emit();
  //   // let native behavior handle submit/navigation
  // };

  private handleClick = (e: Event) => {
    if (this.type === "submit") {
      e.preventDefault();
      const form = this.form
        ? document.getElementById(this.form) as HTMLFormElement
        : this.host.closest("form");
      form?.requestSubmit();
    }
  };

  render() {
    const content = <slot>{this.label}</slot>;

    if (this.href) {
      // render as anchor to preserve native navigation behavior
      return (
        <Host>
          <a class="button" href={this.href} target={this.target}>
            {content}
          </a>
        </Host>
      );
    }
    return (
      <Host>
        <button type={this.type} onClick={this.handleClick}>
          <slot>{this.label}</slot>
        </button>
      </Host>
    );
  }
}
