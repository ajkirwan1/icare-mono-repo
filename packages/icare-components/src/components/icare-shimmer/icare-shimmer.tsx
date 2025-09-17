// shimmer-component.tsx
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "icare-shimmer",
  styleUrl: "icare-shimmer.scss",
  shadow: true
})
export class ShimmerLoader {
  @Prop() width: string = "100%";
  @Prop() height: string = "1rem";

  render() {
    return (
      <div class="shimmer" style={{ width: this.width, height: this.height }} />
    );
  }
}
