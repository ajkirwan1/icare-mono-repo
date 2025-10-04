import { Component, Prop, Host, h, Element, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "icare-button",
  styleUrl: "icare-button.scss",
  shadow: true
})
export class IcareButton {
  /** Button text or fallback when no slot content is provided */
  @Prop() label = "Click";

  /** Visual style */
  @Prop({ reflect: true }) variant: "primary" | "secondary" = "primary";

  /** Size of the button */
  @Prop() size: "small" | "medium" | "large" = "medium";

  /** Optional navigation URL */
  @Prop() href?: string;

  /** Link target (only relevant if href is provided) */
  @Prop() target: "_self" | "_blank" = "_self";

  /** Button type */
  @Prop() type: "button" | "submit" | "reset" = "button";

  /** Form association (for submit/reset outside the form) */
  @Prop() form?: string;

  @Element() host: HTMLElement;

  /** Emits whenever the button is clicked */
  @Event() buttonClick: EventEmitter<void>;

  private handleClick = (e: Event) => {
    e.preventDefault();
    console.log("Button clicked");
    this.buttonClick.emit();

    if (this.href) {
      // Manual navigation instead of <a>
      if (this.target === "_blank") {
        window.open(this.href, "_blank");
      } else {
        window.location.href = this.href;
      }
      return;
    }

    if (this.type === "submit") {
      e.preventDefault();
      const form = this.form
        ? (document.getElementById(this.form) as HTMLFormElement | null)
        : this.host.closest("form");
      form?.requestSubmit();
    }
  };

  render() {
    return (
      <Host>
        <button
          type={this.type}
          onClick={this.handleClick}
          class={`button ${this.variant} ${this.size}`}
        >
          <slot>{this.label}</slot>
        </button>
      </Host>
    );
  }
}
