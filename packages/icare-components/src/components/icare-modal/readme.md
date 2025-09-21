# icare-modal



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                       | Type      | Default     |
| ----------------- | ------------------- | ----------------------------------------------------------------- | --------- | ----------- |
| `closeOnBackdrop` | `close-on-backdrop` | Close when clicking the backdrop                                  | `boolean` | `true`      |
| `closeOnEsc`      | `close-on-esc`      | Close when pressing Escape                                        | `boolean` | `true`      |
| `heading`         | `heading`           | Optional heading for accessibility (falls back to slotted header) | `string`  | `undefined` |
| `open`            | `open`              | Controls visibility of the modal (reflected to attribute for CSS) | `boolean` | `false`     |


## Events

| Event          | Description                                                            | Type                |
| -------------- | ---------------------------------------------------------------------- | ------------------- |
| `requestClose` | Emitted when the modal requests to close (backdrop, Esc, close button) | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
