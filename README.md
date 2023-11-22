# @svelte-plugins/tooltips

A simple tooltip action and component designed for Svelte.

Try it in the [Svelte REPL](https://svelte.dev/repl/e63e262a91834400aa567b9b0d20675a?version=3.49.0).

## Install

```bash
yarn add -D @svelte-plugins/tooltips

# or with NPM

npm i -D @svelte-plugins/tooltips
```

## Using the Tooltip component
```svelte
<script>
  import { Tooltip } from "@svelte-plugins/tooltips";
</script>

<Tooltip content="Hello world!">
 Check out my tooltip
</Tooltip>
```

## Using the Tooltip action

```svelte
<script>
  import { tooltip } from "@svelte-plugins/tooltips";
</script>

Checkout out my <u title="Hello World!" use:tooltip>tooltip</u>

Checkout out my <u use:tooltip={{ content: 'Hello World!' }}>tooltip</u>
```

## API

### Props
| Prop         | Description                                                         | Value                                           |
| :----------- | :------------------------------------------------------------------ | :---------------------------------------------- |
| action       | The action that triggers the tooltip (hover | click | prop)         | `string` (default: `hover`)                     |
| animation    | The animation to apply to the tooltip                               | `string` (default: ``)                          |
| arrow        | If `false`, the tooltip arrow will not be shown.                    | `boolean` (default: `true`)                     |
| autoPosition | Adjust tooltip position if viewport clipping occurs                 | `string` (default: `false`)                     |
| content      | The string or object containing componentref and props              | `string` | `object` component (default: ``)     |
| maxWidth     | The max allowable width of the tooltip content                      | `number` (default: `200`)                       |
| position     | The position where the tooltip should appear relative to its parent | `string` (default: `top`)                       |
| theme        | The CSS theme class name                                            | `string` (default: ``)                          |
| show         | Allows you to manually control the tooltip visibility               | `boolean` (default: `false`)                    |
| style        | The object containing theme variable overrides                      | `object` (default: `null`)                      |

#### Using components as content
| Prop              | Description                                                    | Value                               |
| :-----------------| :------------------------------------------------------------- | :---------------------------------- |
| content.component | Svelte component                                               | `component` (default: `null`)       |
| content.props     | Any component propeties                                        | `object` (default: `null`)          |


```svelte
<script>
  import ComponentAsTooltip from './ComponentAsTooltip';
</script>

Checkout out my <span use:tooltip={{ content: { component: ComponentAsTooltip, props: { title: 'Hello World!' } } }}>tooltip</span>
```

## Theming
You can customize tooltips theme using several methods:
- Assign a theme class name via the `theme` property that includes all of your CSS variables overrides
- Define the overrides directly using the `style` property
- Override the CSS variables globally

Tooltip CSS variables:

```css
--tooltip-arrow-size: 10px;
--tooltip-background-color: rgba(0, 0, 0, 0.9);
--tooltip-border-radius: 4px;
--tooltip-box-shadow: 0 1px 20px rgba(0, 0, 0, 0.25);
--tooltip-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
  'Helvetica Neue', sans-serif;
--tooltip-font-size: 14px;
--tooltip-font-weight: 500;
--tooltip-line-height: 1.25rem;
--tooltip-color: #fff;
--tooltip-offset-x: 12px;
--tooltip-offset-y: 12px;
--tooltip-padding: 12px;
--tooltip-white-space-hidden: nowrap;
--tooltip-white-space-shown: normal;
--tooltip-z-index: 100;
```

### Using the theme property

```svelte
// action
<span title="hello world!" use:tooltip={{ theme: 'custom-tooltip' }}>Hover over me</span>

// component
<Tooltip content="hello world!" theme="custom-tooltip">Hover over me</Tooltip>

<style>
  :global(.tooltip.custom-tooltip) {
    --tooltip-background-color: hotpink;
    --tooltip-box-shadow: 0 1px 8px pink;
  }
</style>
```

### Using the style property
```svelte
// action
<span title="hello world!" use:tooltip={{ style: { backgroundColor: 'blue', borderRadius: '10px' } }}>Hover over me</span>

// component
<Tooltip content="hello world!" style={{ style: { backgroundColor: 'blue' } }}>Hover over me</Tooltip>
```

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
