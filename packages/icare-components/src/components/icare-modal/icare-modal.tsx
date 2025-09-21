import { Component, Host, h, Prop, Event, EventEmitter, Element, Watch } from "@stencil/core";

@Component({
  tag: "icare-modal",
  styleUrl: "icare-modal.scss",
  shadow: true
})
export class IcareModal {
  @Element() host!: HTMLIcareModalElement;

  /** Controls visibility of the modal (reflected to attribute for CSS) */
  @Prop({ reflect: true }) open = false;

  /** Optional heading for accessibility (falls back to slotted header) */
  @Prop() heading?: string;

  /** Close when pressing Escape */
  @Prop() closeOnEsc = true;

  /** Close when clicking the backdrop */
  @Prop() closeOnBackdrop = true;

  /** Emitted when the modal requests to close (backdrop, Esc, close button) */
  @Event() requestClose: EventEmitter<void>;

  private labelId = "icare-modal-title";
  private dialogEl?: HTMLDivElement;
  private previousOverflow?: string;

  @Watch("open")
  onOpenChange(isOpen: boolean) {
    // focus dialog and lock scroll when opened
    if (isOpen) {
      queueMicrotask(() => this.dialogEl?.focus());
      this.previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      // restore scroll when closed
      document.body.style.overflow = this.previousOverflow || "";
    }
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (!this.open) { return; }
    if (this.closeOnEsc && (e.key === "Escape" || e.key === "Esc")) {
      e.preventDefault();
      this.requestClose.emit();
    }
  };

  private onBackdropClick = () => {
    if (this.closeOnBackdrop) {
      this.requestClose.emit();
    }
  };

  private onCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    this.requestClose.emit();
  };

  render() {
    const labelledBy = this.heading ? this.labelId : undefined;

    return (
      <Host onKeyDown={this.onKeyDown} aria-hidden={this.open ? null : "true"}>
        <div class="overlay" onClick={this.onBackdropClick}>
          <div
            class="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabindex={-1}
            ref={(el) => (this.dialogEl = el)}
            // stop clicks inside the dialog from bubbling to the overlay
            onClick={(e) => e.stopPropagation()}
          >
            <header class="header">
              <slot name="header">
                {this.heading && (
                  <h2 id={this.labelId} class="title">
                    {this.heading}
                  </h2>
                )}
              </slot>
              <button class="close" type="button" aria-label="Close" onClick={this.onCloseClick}>
                ×
              </button>
            </header>

            <section class="body">
              <slot />
            </section>

            <footer class="footer">
              <slot name="footer" />
            </footer>
          </div>
        </div>
      </Host>
    );
  }
}
