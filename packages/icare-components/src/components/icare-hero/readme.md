# icare-hero



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                 | Type                            | Default                                |
| ----------------- | ------------------ | ------------------------------------------- | ------------------------------- | -------------------------------------- |
| `imageAlt`        | `image-alt`        | Alt text for accessibility                  | `string`                        | `'iCare hero image'`                   |
| `imageSrc`        | `image-src`        | Background hero image source                | `string`                        | `'images/heros/hero-landing-page.jpg'` |
| `overlayPosition` | `overlay-position` | Overlay position: 'top', 'center', 'bottom' | `"bottom" \| "center" \| "top"` | `'center'`                             |


## Dependencies

### Depends on

- [icare-header](../icare-header)

### Graph
```mermaid
graph TD;
  icare-hero --> icare-header
  icare-header --> icare-logo
  icare-header --> icare-button
  style icare-hero fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
