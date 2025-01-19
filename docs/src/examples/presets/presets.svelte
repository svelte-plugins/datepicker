<script>
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import Prism from 'svelte-prismjs';

  export let days = 29;

  const today = new Date();

  const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

  const getDateFromToday = (days) => {
    return Date.now() - days * MILLISECONDS_IN_DAY;
  };

  let startDate = getDateFromToday(days);
  let endDate = today;
  let dateFormat = 'MMM d, yyyy';
  let isOpen = false;

  let formattedStartDate = '';

  const onClearDates = () => {
    startDate = '';
    endDate = '';
  };

  const onNavigationChange = (e) => {
    console.log(e, 'onNavigationChange');
  };

  const onDateChange = (args) => {
    console.log(args, 'onDateChange');
  };

  const toggleDatePicker = () => (isOpen = !isOpen);
  const formatDate = (dateString) => dateString && format(new Date(dateString), dateFormat) || '';

  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);
</script>

<div class="date-filter">
  <DatePicker
    bind:isOpen
    bind:startDate
    bind:endDate
    {onNavigationChange}
    {onDateChange}
    isRange
    showPresets
    showPresetsOnly
    {...$$restProps}
  >
    <div class="date-field" on:click={toggleDatePicker} role="button" tabindex="0" class:open={isOpen}>
      <i class="icon-calendar" />
      <div class="date">
        {#if startDate}
          {formattedStartDate} - {formattedEndDate}
        {:else}
          Pick a date
        {/if}
      </div>
      {#if startDate}
        <span role="button" tabindex="0" on:click={onClearDates}>
          <i class="os-icon-x" />
        </span>
      {/if}
    </div>
  </DatePicker>
</div>

<Prism showLineNumbers={true} code={`
<script>
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';

  const today = new Date();

  const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

  const getDateFromToday = (days) => {
    return Date.now() - days * MILLISECONDS_IN_DAY;
  };

  let startDate = getDateFromToday(29);
  let endDate = today;
  let dateFormat = 'MMM d, yyyy';
  let isOpen = false;

  let formattedStartDate = '';

  const onClearDates = () => {
    startDate = '';
    endDate = '';
  };

  const onDateChange = (args) => {
    console.log(args, 'onDateChange');
  };

  const toggleDatePicker = () => (isOpen = !isOpen);
  const formatDate = (dateString) => dateString && format(new Date(dateString), dateFormat) || '';

  $: formattedStartDate = formatDate(startDate);
  $: formattedEndDate = formatDate(endDate);
</script>

<div class="date-filter">
  <DatePicker bind:isOpen bind:startDate bind:endDate isRange showPresets showPresetsOnly {onDateChange}>
    <div class="date-field" on:click={toggleDatePicker} class:open={isOpen}>
      <i class="icon-calendar" />
      <div class="date">
        {#if startDate}
          {formattedStartDate} - {formattedEndDate}
        {:else}
          Pick a date
        {/if}
      </div>
      {#if startDate}
        <span on:click={onClearDates}>
          <i class="os-icon-x" />
        </span>
      {/if}
    </div>
  </DatePicker>
</div>

<style>
  .date-field {
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #e8e9ea;
    display: inline-flex;
    gap: 8px;
    min-width: 100px;
    padding: 16px;
  }

  .date-field.open {
    border-bottom: 1px solid #0087ff;
  }

  .date-field .icon-calendar {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEmSURBVHgB7ZcPzcIwEMUfXz4BSCgKwAGgACRMAg6YBBxsOMABOAAHFAXgAK5Z2Y6lHbfQ8SfpL3lZaY/1rb01N+BHUKSMNBfEJjZWISA56Uo6C2KvVpkgFn9oRx9vICFtUT1JKO3tvRtZdjBxXQs+YY+1FenIfuesPUGVVLzfRWKvmrSzbbN19wS+kAb2+sCEuUxrYzkbe4YvCVM2Vr5NPAkVa+van7Wn38U95uTpN5TJ/A8ZKemAakmbmJJGpI0gVmwA0huieFItjG19DgTHtwIZhCfZq3ztCuzQYh+FKBSvusjAGs8PnLYkLgMf34JoIBqIBqKBaIAb0Kw9RlhMCTbzzPWAqYq7LsuPaGDUsYmznaOk5zChUJTNQ4TFVMkrOL4HPsoNn26PxROHCggAAAAASUVORK5CYII=) no-repeat center center;
    background-size: 14px 14px;
    height: 14px;
    width: 14px;
  }
</style>
`} />

<style>
  .date-field {
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #e8e9ea;
    display: inline-flex;
    gap: 8px;
    min-width: 100px;
    padding: 16px;
  }

  .date-field.open {
    border-bottom: 1px solid #0087ff;
  }

  .date-field .icon-calendar {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEmSURBVHgB7ZcPzcIwEMUfXz4BSCgKwAGgACRMAg6YBBxsOMABOAAHFAXgAK5Z2Y6lHbfQ8SfpL3lZaY/1rb01N+BHUKSMNBfEJjZWISA56Uo6C2KvVpkgFn9oRx9vICFtUT1JKO3tvRtZdjBxXQs+YY+1FenIfuesPUGVVLzfRWKvmrSzbbN19wS+kAb2+sCEuUxrYzkbe4YvCVM2Vr5NPAkVa+van7Wn38U95uTpN5TJ/A8ZKemAakmbmJJGpI0gVmwA0huieFItjG19DgTHtwIZhCfZq3ztCuzQYh+FKBSvusjAGs8PnLYkLgMf34JoIBqIBqKBaIAb0Kw9RlhMCTbzzPWAqYq7LsuPaGDUsYmznaOk5zChUJTNQ4TFVMkrOL4HPsoNn26PxROHCggAAAAASUVORK5CYII=) no-repeat center center;
    background-size: 14px 14px;
    height: 14px;
    width: 14px;
  }
</style>
