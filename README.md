# @svelte-plugins/datepicker

A simple datepicker component designed for Svelte.

Try it in the [Svelte REPL](https://svelte.dev/repl/cae0ce6e92634878b6e1a587146decbd?version=4.2.7).

## Install

```bash
# npm
> npm install svelte @svelte-plugins/datepicker

# pnpm
> pnpm install svelte @svelte-plugins/datepicker

# yarn
> yarn add svelte @svelte-plugins/datepicker
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
| enabledDates      | An array of date strings to enable only.                                              | `array` (default: [...])
| disabledDates     | An array of date strings to disable.                                                  | `array` (default: [...])
| isRange	          |	Changes the date picker into a range picker and allows start and end date selection.  | `boolean` (default: `false`)
| isMultipane	      |	If true, two calendar months will be shown side-by-side instead of one.               | `boolean` (default: `false`)
| isOpen            |	If true, the picker will be shown without user interaction.	                          | `boolean` (default: `false`)
| showPresets	      |	If true, the picker will show the preset ranges for selection.	                      | `boolean` (default: `false`)
| showYearControls  |	If true, the picker will hide the year navigation controls.	                          | `boolean` (default: `false`)
| showTimePicker	  |	If true, the picker will show the time picker.	                                      | `boolean` (default: `false`)
| enableFutureDates	|	If true, the picker will allow the user to select future dates.                       | `boolean` (default: `false`)
| enablePastDates	  |	If disabled, the picker will prevent the user from selecting anything prior to today.	| `boolean` (default: `true`)
| theme             | The theme name that should be assigned to the theme data-attribute.                   | `string` (default: `''`)
| presetRanges      | The array of present configs to replace the default set with.                         | `array` (default: [...])

### Events
| Prop               | Description                                                                           | Default                     |
| :----------------- | :------------------------------------------------------------------------------------ | :-------------------------- |
| onDayClick	       | Callback function to handle day click events.	                                       | `function`
| onNavigationChange | Callback function to handle the navigation click event for months and years           | `function`

## Theming
You can customize DatePicker theme using several methods:
- Assign a theme class name via the `theme` property that includes all of your CSS variables overrides
- Define the overrides directly using the `style` property
- Override the CSS variables globally

DatePicker CSS variables:

```css
  /**
   * Common Variables
   */
  --datepicker-border-color: #e8e9ea;

  --datepicker-border-radius-small: .125rem;
  --datepicker-border-radius-base: .25rem;
  --datepicker-border-radius-large: .5rem;
  --datepicker-border-radius-xlarge: .75rem;
  --datepicker-border-radius-xxlarge: 1rem;
  --datepicker-border-radius-xxxlarge: 1.125rem;

  --datepicker-state-active: #0087ff;
  --datepicker-state-hover: #e7f7fc;

  --datepicker-color: #21333d;

  --datepicker-font-family: 'Rubik', sans-serif;

  --datepicker-font-size-jumbo: 1.75rem;
  --datepicker-font-size-xxxlarge: 1.5rem;
  --datepicker-font-size-xxlarge: 1.375rem;
  --datepicker-font-size-xlarge: 1.25rem;
  --datepicker-font-size-large: 1.125rem;
  --datepicker-font-size-base: 14px;
  --datepicker-font-size-medium: 0.89rem;
  --datepicker-font-size-small: 0.75rem;
  --datepicker-font-size-xsmall: 0.625rem;
  --datepicker-font-size-xxsmall: 0.5rem;
  --datepicker-font-size-xxxsmall: 0.375rem;
  --datepicker-font-weight-thin: 100;
  --datepicker-font-weight-light: 300;
  --datepicker-font-weight-base: 400;
  --datepicker-font-weight-medium: 500;
  --datepicker-font-weight-bold: 700;
  --datepicker-font-weight-black: 900;

  --datepicker-spacing: 8px;

  --datepicker-margin-xsmall: calc(var(--datepicker-spacing) / 4);
  --datepicker-margin-small: calc(var(--datepicker-spacing) / 2);
  --datepicker-margin-base: var(--datepicker-spacing);
  --datepicker-margin-large: calc(var(--datepicker-spacing) * 2);
  --datepicker-margin-xlarge: calc(var(--datepicker-spacing) * 3);
  --datepicker-margin-xxlarge: calc(var(--datepicker-spacing) * 4);
  --datepicker-margin-xxxlarge: calc(var(--datepicker-spacing) * 5);
  --datepicker-margin-jumbo: calc(var(--datepicker-spacing) * 6);

  --datepicker-padding-xsmall: calc(var(--datepicker-spacing) / 4);
  --datepicker-padding-small: calc(var(--datepicker-spacing) / 2);
  --datepicker-padding-base: var(--datepicker-spacing);
  --datepicker-padding-large: calc(var(--datepicker-spacing) * 2);
  --datepicker-padding-xlarge: calc(var(--datepicker-spacing) * 3);
  --datepicker-padding-xxlarge: calc(var(--datepicker-spacing) * 4);
  --datepicker-padding-xxxlarge: calc(var(--datepicker-spacing) * 5);
  --datepicker-padding-jumbo: calc(var(--datepicker-spacing) * 6);

  /**
   * Container
   */
  --datepicker-container-background: #fff;
  --datepicker-container-border: 1px solid var(--datepicker-border-color);
  --datepicker-container-border-radius: 12px;
  --datepicker-container-box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
  --datepicker-container-font-family: var(--datepicker-font-family);
  --datepicker-container-left: 0;
  --datepicker-container-position: absolute;
  --datepicker-container-width: fit-content;
  --datepicker-container-zindex: 99;

  /**
   * Calendar
   */
  --datepicker-calendar-border: 0;
  --datepicker-calendar-padding: var(--datepicker-padding-base) var(--datepicker-padding-large) var(--datepicker-padding-xlarge);
  --datepicker-calendar-position: relative;
  --datepicker-calendar-width: 310px;

  --datepicker-calendar-split-border: 1px solid var(--datepicker-border-color);

  /**
   * Calendar Header
   */
  --datepicker-calendar-header-align-items: center;
  --datepicker-calendar-header-color: var(--datepicker-color);
  --datepicker-calendar-header-display: flex;
  --datepicker-calendar-header-font-size: var(--datepicker-font-size-large);
  --datepicker-calendar-header-justify-content: space-between;
  --datepicker-calendar-header-margin: 0 0 var(--datepicker-margin-xlarge) 0;
  --datepicker-calendar-header-padding: var(--datepicker-padding-large) var(--datepicker-padding-base);
  --datepicker-calendar-header-user-select: none;

  /**
   * Calendar Header Month Navigation
   */
  --datepicker-calendar-header-month-nav-background: transparent;
  --datepicker-calendar-header-month-nav-background-hover: #f5f5f5;
  --datepicker-calendar-header-month-nav-border: 0;
  --datepicker-calendar-header-month-nav-cursor: pointer;
  --datepicker-calendar-header-month-nav-border-radius: 20px;
  --datepicker-calendar-header-month-nav-color: var(--datepicker-color);
  --datepicker-calendar-header-month-nav-cursor: pointer;
  --datepicker-calendar-header-month-nav-font-size: var(--datepicker-font-size-large);
  --datepicker-calendar-header-month-nav-height: 32px;
  --datepicker-calendar-header-month-nav-margin-left: -8px;
  --datepicker-calendar-header-month-nav-padding: var(--datepicker-padding-small);
  --datepicker-calendar-header-month-nav-text-align: center;
  --datepicker-calendar-header-month-nav-width: 32px;

  --datepicker-calendar-header-month-nav-icon-next-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACLSURBVHgB7ZTLCYAwEERHbcASUpIlaAd2YDoxlmIX3ixFEwwYQQL5kCWwD94ph5mwywIMUzmLlYRBe1lXENBrT+oSgktwiepLNJ63EWkl3AOltBMCkHh/kEv5F9SCGN8IzKntEYfAdwQb0kYaHO4uoUJBBIdzOAoiKMMNQ47wDvEceA7Zrp3BMLVyA56LVFYQOkngAAAAAElFTkSuQmCC') no-repeat center center;
  --datepicker-calendar-header-month-nav-icon-next-background-size: 16px 16px;
  --datepicker-calendar-header-month-nav-icon-next-filter: invert(0);
  --datepicker-calendar-header-month-nav-icon-next-height: 16px;
  --datepicker-calendar-header-month-nav-icon-next-margin: auto;
  --datepicker-calendar-header-month-nav-icon-next-width: 16px;

  --datepicker-calendar-header-month-nav-icon-prev-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACKSURBVHgB7ZbBDYAgDEW/xgEcgZHcQDYRJ5ER3EhHcAPtAQMHQwIiSNKXvAMH+CUNDQDDVM5kLMJCnsYBmXHDN1IgIxzO4QIZ+Ty8gT9cOuuZ3BHHQa4hGxTszVOpnoJaFMbXAk2OzvpNC+7zojYVewFcBBdRVRE9CqCR4EvWIR4JO5iC5jzD/IoLU/FXPXheCj0AAAAASUVORK5CYII=') no-repeat center center;
  --datepicker-calendar-header-month-nav-icon-prev-background-size: 16px 16px;
  --datepicker-calendar-header-month-nav-icon-prev-filter: invert(0);
  --datepicker-calendar-header-month-nav-icon-prev-height: 16px;
  --datepicker-calendar-header-month-nav-icon-prev-margin: auto;
  --datepicker-calendar-header-month-nav-icon-prev-width: 16px;

  /**
   * Calendar Header Text
   */
  --datepicker-calendar-header-text-align-items: center;
  --datepicker-calendar-header-text-color: var(--datepicker-color);
  --datepicker-calendar-header-text-display: flex;
  --datepicker-calendar-header-text-font-size: inherit;
  --datepicker-calendar-header-text-font-weight: var(--datepicker-font-weight-medium);
  --datepicker-calendar-header-text-gap: 8px;

  /**
   * Calendar Header Year Navigation Container
   */
  --datepicker-calendar-header-year-align-items: center;
  --datepicker-calendar-header-year-display: flex;
  --datepicker-calendar-header-year-flex-direction: column;
  --datepicker-calendar-header-year-margin: 0;

  /**
   * Calendar Header Year Navigation Controls
   */
  --datepicker-calendar-header-year-nav-display: block;
  --datepicker-calendar-header-year-nav-color: var(--datepicker-color);
  --datepicker-calendar-header-year-nav-height: 12px;
  --datepicker-calendar-header-year-nav-line-height: 12px;
  --datepicker-calendar-header-year-nav-margin: -2px 0 0 0;
  --datepicker-calendar-header-year-nav-padding: 0;
  --datepicker-calendar-header-year-nav-width: 12px;
  --datepicker-calendar-header-year-nav-icon-font-size: 13px;

  --datepicker-calendar-header-year-nav-icon-next-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABuSURBVHgB7c7BCYAwDIXhBy7gKB2hm9Vx3UJzqCASRWOTHvo+yDG8HyAiGt2Ef7LcLLeigyK31SsIdh4Pj9DGwyKu40u9kAht/OAe8TTuHvFm3C3iy3jziGQYv4vIMMjGcS0iwSjBWN/on4hoADu88UW4KXFVfgAAAABJRU5ErkJggg==') no-repeat center center;
  --datepicker-calendar-header-year-nav-icon-next-background-size: 12px 12px;
  --datepicker-calendar-header-year-nav-icon-next-display: block;
  --datepicker-calendar-header-year-nav-icon-next-filter: invert(0);
  --datepicker-calendar-header-year-nav-icon-next-height: 12px;
  --datepicker-calendar-header-year-nav-icon-next-width: 12px;

  --datepicker-calendar-header-year-nav-icon-prev-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB3SURBVHgB7dTRCYAwDATQAxdwlI6QzZpx3UIrKJSC1aS2fngP7kvi3VcBIqK/m26+S8qcssBHWu5Dynokwi5m9wIHyX5gHRGL2wAndYwoyxWN1DDi9XLLiG7lT0Z0L6+NGFZ+NWJoeW2EYjD9svy0PzACIiJqsAHF2EaCcjFGaQAAAABJRU5ErkJggg==') no-repeat center center;
  --datepicker-calendar-header-year-nav-icon-prev-background-size: 12px 12px;
  --datepicker-calendar-header-year-nav-icon-prev-display: block;
  --datepicker-calendar-header-year-nav-icon-prev-filter: invert(0);
  --datepicker-calendar-header-year-nav-icon-prev-height: 12px;
  --datepicker-calendar-header-year-nav-icon-prev-width: 12px;

  /**
   * Presets
   */
  --datepicker-presets-border: 1px solid var(--datepicker-border-color);
  --datepicker-presets-padding: 24px;
  --datepicker-presets-minwidth: 180px;
  --datepicker-presets-maxwidth: 200px;

  /**
   * Presets Button
   */
  --datepicker-presets-button-background: transparent;
  --datepicker-presets-button-background-hover: var(--datepicker-state-hover);
  --datepicker-presets-button-background-active: var(--datepicker-state-active);

  --datepicker-presets-button-border: 0;
  --datepicker-presets-button-border-radius: 40px;
  --datepicker-presets-button-border-radius-active: 20px;

  --datepicker-presets-button-color: var(--datepicker-color);
  --datepicker-presets-button-color-active: #fff;
  --datepicker-presets-button-color-hover: var(--datepicker-color);
  --datepicker-presets-button-color-focus: var(--datepicker-color);

  --datepicker-presets-button-cursor: pointer;
  --datepicker-presets-button-cursor-active: default;

  --datepicker-presets-button-font-family: var(--datepicker-font-family);
  --datepicker-presets-button-font-size: var(--datepicker-font-size-base);
  --datepicker-presets-button-font-weight-active: var(--datepicker-font-weight-medium);
  --datepicker-presets-button-outline-focus: 5px auto -webkit-focus-ring-color;

  --datepicker-presets-button-margin: var(--datepicker-margin-small) 0;
  --datepicker-presets-button-padding: calc(var(--datepicker-padding-base) + 2px) var(--datepicker-padding-large);
  --datepicker-presets-button-text-align: left;
  --datepicker-presets-button-zindex-focus: 10;

  /**
   * Timepicker Container
   */
  --datepicker-timepicker-container-align-items: center;
  --datepicker-timepicker-container-display: flex;
  --datepicker-timepicker-container-justify-content: space-around;
  --datepicker-timepicker-container-margin-bottom: var(--datepicker-margin-xlarge);

  /**
   * Timepicker Input
   */
  --datepicker-timepicker-input-border: 1px solid var(--datepicker-border-color);
  --datepicker-timepicker-input-border-radius: var(--datepicker-border-radius-base);
  --datepicker-timepicker-input-display: block;
  --datepicker-timepicker-input-font-family: var(--datepicker-font-family);
  --datepicker-timepicker-input-margin: 0 auto;
  --datepicker-timepicker-input-padding: var(--datepicker-padding-small) var(--datepicker-padding-base);

  /**
   * Calendar DOW (Days of Week)
   */
  --datepicker-calendar-dow-color: #8b9198;
  --datepicker-calendar-dow-font-size: var(--datepicker-font-size-base);
  --datepicker-calendar-dow-font-weight: var(--datepicker-font-weight-medium);
  --datepicker-calendar-dow-margin-bottom: var(--datepicker-margin-large);
  --datepicker-calendar-dow-text-align: center;

  /**
   * Calendar Month
   */
  --datepicker-calendar-container-display: grid;
  --datepicker-calendar-container-grid-template-columns: repeat(7, 1fr);
  --datepicker-calendar-container-grid-gap: 0;
  --datepicker-calendar-container-width: fit-content;

  /**
   * Calendar Day Container
   */
  --datepicker-calendar-day-container-appearance: none;
  --datepicker-calendar-day-container-background: inherit;
  --datepicker-calendar-day-container-border: 0;
  --datepicker-calendar-day-container-margin: 0;
  --datepicker-calendar-day-container-padding: 0;
  --datepicker-calendar-day-container-position: relative;
  --datepicker-calendar-day-container-text-align: center;

  /**
   * Calendar Day
   */
  --datepicker-calendar-day-align-items: center;
  --datepicker-calendar-day-background-hover: #f5f5f5;
  --datepicker-calendar-day-border: 1px solid transparent;
  --datepicker-calendar-day-border: 1px solid transparent;
  --datepicker-calendar-day-border-radius: 100%;
  --datepicker-calendar-day-color: #232a32;
  --datepicker-calendar-day-color-disabled: #b9bdc1;
  --datepicker-calendar-day-color-hover: #232a32;
  --datepicker-calendar-day-cursor: pointer;
  --datepicker-calendar-day-cursor-disabled: default;
  --datepicker-calendar-day-display: flex;
  --datepicker-calendar-day-height: 40px;
  --datepicker-calendar-day-justify-content: center;
  --datepicker-calendar-day-font-family: var(--datepicker-font-family);
  --datepicker-calendar-day-font-size: var(--datepicker-font-size-base);
  --datepicker-calendar-day-margin-bottom: 1px;
  --datepicker-calendar-day-padding: var(--datepicker-padding-base);
  --datepicker-calendar-day-text-align: center;
  --datepicker-calendar-day-width: 40px;
  --datepicker-calendar-day-zindex-focus: 12;

  /**
   * Calendar Days Outside of Month
   */
  --datepicker-calendar-day-other-border: 0;
  --datepicker-calendar-day-other-box-shadow: none;
  --datepicker-calendar-day-other-color: #d1d3d6;

  /**
   * Calendar Today
   */
  --datepicker-calendar-today-background: transparent;
  --datepicker-calendar-today-border: 1px solid #232a32;
  --datepicker-calendar-today-cursor: default;
  --datepicker-calendar-today-font-weight: var(--datepicker-font-weight-bold);

  /**
   * Calendar Range
   */
  --datepicker-calendar-range-background: var(--datepicker-state-hover);
  --datepicker-calendar-range-background-disabled: var(--datepicker-state-hover);
  --datepicker-calendar-range-border: 0;
  --datepicker-calendar-range-border-radius: 0;
  --datepicker-calendar-range-color: var(--datepicker-color);
  --datepicker-calendar-range-color-disabled: #ffc0b7;
  --datepicker-calendar-range-cursor: default;
  --datepicker-calendar-range-font-weight: var(--datepicker-font-weight-base);

  /**
   * Calendar Range Start & End
   */
  --datepicker-calendar-range-start-box-shadow: inset -20px 0 0 var(--datepicker-state-hover);
  --datepicker-calendar-range-end-box-shadow: inset 20px 0 0 var(--datepicker-state-hover);
  --datepicker-calendar-range-start-box-shadow-selected: inset -20px 0 0 #eceff1;
  --datepicker-calendar-range-end-box-shadow-selected: inset 20px 0 0 #eceff1;

  --datepicker-calendar-range-start-end-background: #f5f5f5;
  --datepicker-calendar-range-start-end-color: #232a32;

  /**
   * Calendar Range Selected
   */
  --datepicker-calendar-range-selected-background: var(--datepicker-state-active);
  --datepicker-calendar-range-selected-border-radius: 20px;
  --datepicker-calendar-range-selected-color: #fff;
  --datepicker-calendar-range-selected-font-weight: var(--datepicker-font-weight-medium);

  --datepicker-calendar-range-selected-start-border-radius: 20px;

  /**
   * Calendar Range Hover
   */
  --datepicker-calendar-range-included-background: #eceff1;
  --datepicker-calendar-range-included-box-shadow: inset 20px 0 0 #eceff1;
  --datepicker-calendar-range-included-color: #232a32;
  --datepicker-calendar-range-included-font-weight: var(--datepicker-font-weight-base);
  --datepicker-calendar-range-included-height: var(--datepicker-calendar-day-height);
```

### Using the theme property

```svelte
<DatePicker ... theme="custom-datepicker">...</DatePicker>

<style>
  :global(.datepicker[data-picker-theme="custom-datepicker"]) {
    --datepicker-state-active: pink;
    --datepicker-container-background: #FF66AE;
    --datepicker-calendar-header-text-color: #fff;
    --datepicker-calendar-dow-color: #fff;
    --datepicker-calendar-day-color: #fff;
    --datepicker-calendar-day-color-disabled: pink;
    --datepicker-calendar-range-selected-background: #ff1683;
    --datepicker-calendar-header-month-nav-icon-next-filter: invert(100);
    --datepicker-calendar-header-month-nav-icon-prev-filter: invert(100);
    --datepicker-calendar-header-year-nav-icon-next-filter: invert(100);
    --datepicker-calendar-header-year-nav-icon-prev-filter: invert(100);
  }
</style>
```

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
