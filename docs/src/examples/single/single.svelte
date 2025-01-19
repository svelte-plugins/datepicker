<script>
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';
  import Prism from 'svelte-prismjs';

  export let showTimePicker = false;
  export let disabledDates = [];
  export let enableFutureDates = null;
  export let enablePastDates = null;
  export let enabledDates = [];

  let startDate = new Date();
  let dateFormat = 'MM/dd/yy';
  let isOpen = false;

  const toggleDatePicker = () => (isOpen = !isOpen);

  const formatDate = (dateString) => {
    if (isNaN(new Date(dateString))) {
      return '';
    }

    return dateString && format(new Date(dateString), dateFormat) || '';
  };

  let formattedStartDate = formatDate(startDate);

  const onChange = () => {
    startDate = new Date(formattedStartDate);
  };

  const onNavigationChange = (e) => {
    console.log(e, 'onNavigationChange');
  };

  const onDateChange = (args) => {
    console.log(args, 'onDateChange');
  };

  $: formattedStartDate = formatDate(startDate);
</script>

<DatePicker bind:isOpen bind:startDate {...$$props} {onNavigationChange} {onDateChange}>
  <input type="text" bind:value={formattedStartDate} on:change={onChange} on:click={toggleDatePicker} />
</DatePicker>

<Prism showLineNumbers={true} code={`

<script>
  import { DatePicker } from '@svelte-plugins/datepicker';
  import { format } from 'date-fns';

  let startDate = new Date();
  let dateFormat = 'MM/dd/yy';
  let isOpen = false;

  const toggleDatePicker = () => (isOpen = !isOpen);

  const formatDate = (dateString) => {
    if (isNaN(new Date(dateString))) {
      return '';
    }

    return dateString && format(new Date(dateString), dateFormat) || '';
  };
  let formattedStartDate = formatDate(startDate);

  const onChange = () => {
    startDate = new Date(formattedStartDate);
  };

  $: formattedStartDate = formatDate(startDate);
</script>

<DatePicker bind:isOpen bind:startDate${showTimePicker ? ' showTimePicker' : ''}${enabledDates.length ? ' enabledDates={' + JSON.stringify(enabledDates)+'}': ''}${disabledDates.length ? ' disabledDates={' + JSON.stringify(disabledDates)+'}': ''}${enableFutureDates !== null && enableFutureDates ? ' enableFutureDates' : ''}${enablePastDates !== null && !enablePastDates ? ' enablePastDates={false}' : ''}>
  <input type="text" placeholder="Select date" bind:value={formattedStartDate} on:click={toggleDatePicker} />
</DatePicker>

<style>
  input[type="text"] {
    border: 1px solid #e8e9ea;
    border-radius: 4px;
    padding: 8px;
  }
</style>
`} />

<style>
  input[type="text"] {
    border: 1px solid #e8e9ea;
    border-radius: 4px;
    padding: 8px;
  }
</style>
