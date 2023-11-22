# @svelte-plugins/datepicker

A simple datepicker component designed for Svelte.

Try it in the [Svelte REPL](https://svelte.dev/repl/cae0ce6e92634878b6e1a587146decbd?version=4.2.7).

## Install

```bash
yarn add -D @svelte-plugins/datepicker

# or with NPM

npm i -D @svelte-plugins/datepicker
```

## Using the DatePicker component
```svelte
<script>
  import { DatePicker } from "@svelte-plugins/datepicker";
  import { format } from 'date-fns';

  let startDate = new Date();
  let dateFormat = 'MM/dd/yy';
  let isOpen = false;

  const toggleDatePicker = () => (isOpen = !isOpen);

  const formatDate = (dateString) => {
    return dateString && format(new Date(dateString), dateFormat) || '';
  };

  let formattedStartDate = formatDate(startDate);

  const onChange = () => {
    startDate = new Date(formattedStartDate);
  };

  $: formattedStartDate = formatDate(startDate);
</script>

<DatePicker bind:isOpen bind:startDate>
  <input type="text" placeholder="Select date" bind:value={formattedStartDate} on:click={toggleDatePicker} />
</DatePicker>

<style>
  input[type="text"] {
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 8px;
  }
</style>
```

## API

### Props
| Prop              | Description                                                                           | Default                     |
| :---------------- | :------------------------------------------------------------------------------------ | :-------------------------- |
| startDate	        | The start date string or date object.	                                                | `object` (default: `null`)
| startDateTime	    | The start date time string in 24 hour format.	                                        | `string` (default: `00:00`)
| endDateTime	      | The end date time string in 24 hour format.                                           | `string` (default: `00:00`)
| defaultYear	      |	The year you want to show as the default.	                                            | `number` (default: `2023`)
| align	            | The edge alignment of the datepicker.                                                 | `string` (default: `left`)
| isRange	          |	Changes the date picker into a range picker and allows start and end date selection.  | `boolean` (default: `false`)
| isMultipane	      |	If true, two calendar months will be shown side-by-side instead of one.               | `boolean` (default: `false`)
| isOpen            |	If true, the picker will be shown without user interaction.	                          | `boolean` (default: `false`)
| showPresets	      |	If true, the picker will show the preset ranges for selection.	                      | `boolean` (default: `false`)
| showYearControls  |	If true, the picker will hide the year navigation controls.	                          | `boolean` (default: `false`)
| showTimePicker	  |	If true, the picker will show the time picker.	                                      | `boolean` (default: `false`)
| enableFutureDates	|	If true, the picker will allow the user to select future dates.                       | `boolean` (default: `false`)
| enablePastDates	  |	If disabled, the picker will prevent the user from selecting anything prior to today.	| `boolean` (default: `true`)


## Theming
You can customize DatePicker theme using several methods:
- Assign a theme class name via the `theme` property that includes all of your CSS variables overrides
- Define the overrides directly using the `style` property
- Override the CSS variables globally

DatePicker CSS variables:

```css
---arrow-size: 10px;
---background-color: rgba(0, 0, 0, 0.9);
---border-radius: 4px;
---box-shadow: 0 1px 20px rgba(0, 0, 0, 0.25);
---font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
  'Helvetica Neue', sans-serif;
---font-size: 14px;
---font-weight: 500;
---line-height: 1.25rem;
---color: #fff;
---offset-x: 12px;
---offset-y: 12px;
---padding: 12px;
---white-space-hidden: nowrap;
---white-space-shown: normal;
---z-index: 100;
```

### Using the theme property

```svelte
<DatePicker ... theme="custom-datepicker">...</DatePicker>

<style>
  :global(.datepicker.custom-datepicker) {
    ---background-color: hotpink;
    ---box-shadow: 0 1px 8px pink;
  }
</style>
```

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
