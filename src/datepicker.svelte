<script>
  // @ts-nocheck
  import { tick } from 'svelte';
  import { clickOutside } from './actions';

  /**
   * Represents the start date for a date picker.
   * @type {any}
   */
  export let startDate = null;

  /**
   * Represents the end date for a date picker.
   * @type {any}
   */
  export let endDate = null;

  /**
   * Represents the start time for the date picker (in HH:mm format).
   * @type {string}
   */
  export let startDateTime = '00:00';

  /**
   * Represents the end time for the date picker (in HH:mm format).
   * @type {string}
   */
  export let endDateTime = '00:00';

  /**
   * Represents the current date.
   * @type {Date}
   */
  export let today = new Date();

  /**
   * Represents the default year for the date picker.
   * @type {number}
   */
  export let defaultYear = today.getFullYear();

  /**
   * Represents the default month for the date picker.
   * @type {number}
   */
  export let defaultMonth = today.getMonth();

  /**
   * Represents the start day of the week (0 for Sunday, 1 for Monday, etc.).
   * @type {number}
   */
  export let startOfWeek = 0;

  /**
   * Indicates whether the date picker has multiple panes.
   * @type {boolean}
   */
  export let isMultipane = false;

  /**
   * Indicates whether the date picker is in range mode.
   * @type {boolean}
   */
  export let isRange = false;

  /**
   * Indicates whether the date picker is open.
   * @type {boolean}
   */
  export let isOpen = false;

  /**
   * Specifies the alignment of the date picker (e.g., 'left', 'center', 'right').
   * @type {string}
   */
  export let align = 'left';

  /**
   * Represents the theme of the date picker.
   * @type {string}
   */
  export let theme = '';

  /**
   * An array of disabled dates.
   * @type {Date[]}
   */
  export let disabledDates = [];

  /**
   * An array of enabled dates.
   * @type {Date[]}
   */
  export let enabledDates = [];

  /**
   * Callback function to handle day click events.
   * @type {(event: Object) => void}
   */
  export let onDayClick = () => {};

  /**
   * Callback function to handle the navigation click event for months and years
   * @type {(event: Object) => void}
   */
  export let onNavigationChange = () => {};

  /**
   * Indicates whether the date picker should always be shown.
   * @type {boolean}
   */
  export let alwaysShow = false;

  /**
   * Indicates whether year controls are displayed in the date picker.
   * @type {boolean}
   */
  export let showYearControls = true;

  /**
   * Indicates whether preset options are displayed in the date picker.
   * @type {boolean}
   */
  export let showPresets = false;

  /**
   * Indicates whether the time picker is shown in the date picker.
   * @type {boolean}
   */
  export let showTimePicker = false;

  /**
   * Indicates whether future dates are enabled.
   * @type {boolean}
   */
  export let enableFutureDates = false;

  /**
   * Indicates whether past dates are enabled.
   * @type {boolean}
   */
  export let enablePastDates = true;

  /**
   * An array of preset date range labels.
   * @type {string[]}
   */
  export let presetLabels = ['Today', 'Last 7 Days', 'Last 30 Days', 'Last 60 Days', 'Last 90 Days', 'Last Year'];

  /**
   * An array of day-of-week labels.
   * @type {string[]}
   */
  export let dowLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  /**
   * An array of month labels.
   * @type {string[]}
   */
  export let monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  /**
   * The number of milliseconds in a day.
   * @type {number}
   */
  export const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

  /**
   * Calculates a date based on the number of days from today.
   *
   * @param {number} days - The number of days to subtract from today.
   * @returns {number} - The timestamp of the calculated date.
   */
  export const getDateFromToday = (days) => {
    return Date.now() - days * MILLISECONDS_IN_DAY;
  };

  /**
   * An array of preset date ranges with labels and start/end timestamps.
   * @type {Object[]}
   */
  export let presetRanges = [
    {
      label: presetLabels[0],
      start: getDateFromToday(0),
      end: getDateFromToday(0)
    },
    {
      label: presetLabels[1],
      start: getDateFromToday(6),
      end: getDateFromToday(0)
    },
    {
      label: presetLabels[2],
      start: getDateFromToday(29),
      end: getDateFromToday(0)
    },
    {
      label: presetLabels[3],
      start: getDateFromToday(59),
      end: getDateFromToday(0)
    },
    {
      label: presetLabels[4],
      start: getDateFromToday(89),
      end: getDateFromToday(0)
    },
    {
      label: presetLabels[5],
      start: getDateFromToday(364),
      end: getDateFromToday(0)
    }
  ];

  /**
   * Initialization flag to delay some actions
   * @type {boolean}
   */
  let initialize = false;

  /**
   * Stores the possible end date for a date range.
   * @type {any}
   */
  let tempEndDate;

  /**
   * Stores the start date for any revert operation.
   * @type {any}
   */
  let prevStartDate;

  /**
   * Stores the end date for any revert operation.
   * @type {any}
   */
  let prevEndDate;

  /**
   * Generates a calendar representation as a two-dimensional array. (Pulled from github.com/lukeed/calendarize)
   *
   * @param {Date} target - The target date for the calendar (defaults to the current date if not provided).
   * @param {number} offset - The offset for the first day of the week (0 for Sunday, 1 for Monday, etc.).
   * @returns {Array<Array<number>>} A two-dimensional array representing the calendar.
   */
  const calendarize = (target, offset) => {
    const out = [];
    const date = new Date(target || new Date());
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    let first = new Date(year, month, 1 - (offset | 0)).getDay();
    let i = 0;
    let j = 0;
    let week;

    while (i < days) {
      for (j = 0, week = Array(7); j < 7; ) {
        while (j < first) {
          week[j++] = 0;
        }

        week[j++] = ++i > days ? 0 : i;

        first = 0;
      }

      out.push(week);
    }

    return out;
  };

  /**
   * Creates a timestamp for a given year, month, and day.
   *
   * @param {number} year - The year.
   * @param {number} month - The month (0-11, where 0 is January and 11 is December).
   * @param {number} day - The day of the month.
   * @returns {number} - The timestamp representing the specified date.
   */
  const createTimestamp = (year, month, day) => new Date(year, month, day).getTime();

  /**
   * Gets the timestamp for a given date.
   *
   * @param {Date} date - The date.
   * @returns {number} - The timestamp of the date.
   */
  const getTimestamp = (date) => new Date(date).getTime();

  /**
   * Normalizes a timestamp by setting the time to midnight (00:00:00.000).
   *
   * @param {any} timestamp - The timestamp to normalize.
   * @returns {number} - The normalized timestamp.
   */
  const normalizeTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  };

  /**
   * Handles the click outside event of the date picker.
   */
  const onClickOutside = () => {
    if (alwaysShow) {
      return;
    }

    if (prevStartDate && prevEndDate && startDate && !endDate) {
      startDate = prevStartDate;
      endDate = prevEndDate;
      prevStartDate = null;
      prevEndDate = null;
    }

    isOpen = false;
  };

  let startDateYear = Number(defaultYear);
  let startDateMonth = Number(defaultMonth);

  const updateCalendars = () => {
    startDateCalendar = startDateCalendar;
    endDateCalendar = endDateCalendar;
  };

  /**
   * Handles the navigation click event for months and years
   * @param {string} direction - The direction of the navigation (previous or next).
   * @param {string} type - The type of navigation (month or year).
   */
  const onNavigation = async (direction, type) => {
    await tick();

    const initial = new Date(defaultYear, defaultMonth);
    const initialDayOffMonth = '01';

    let current = new Date(startDateYear, startDateMonth);
    let month = startDateMonth + 1;

    const calendar = isMultipane ? endDateCalendar : startDateCalendar;
    const lastWeekOfMonth = calendar[calendar.length - 1].filter(Boolean);
    const lastDayOfMonth = lastWeekOfMonth[lastWeekOfMonth.length - 1];

    const currentPeriod = {
      start: `${startDateYear}-${month >= 10 ? month : `0${month}`}-${initialDayOffMonth}`,
      end: `${startDateYear}-${month >= 10 ? month : `0${month}`}-${lastDayOfMonth}`
    };

    if (isMultipane) {
      month += 1;

      if (month > 11) {
        month = 1;
      }

      currentPeriod.end = `${endDateYear}-${month >= 10 ? month : `0${month}`}-${lastDayOfMonth}`;
      current = new Date(endDateYear, endDateMonth);
    }

    onNavigationChange({
      direction,
      type,
      currentPeriod,
      isPastPeriod: current < initial
    });
  };

  /**
   * Handles the "to previous month" action in the date picker.
   */
  const toPrev = () => {
    [startDateCalendar, next] = [prev, startDateCalendar];

    if (--startDateMonth < 0) {
      startDateMonth = 11;
      startDateYear--;
    }

    onNavigation('previous', 'month');
  };

  /**
   * Handles the "to previous year" action in the date picker.
   */
  const toPrevYear = () => {
    startDateYear--;
    onNavigation('previous', 'year');
  };

  /**
   * Handles the "to next month" action in the date picker.
   */
  const toNext = () => {
    [prev, startDateCalendar] = [startDateCalendar, next];

    if (++startDateMonth > 11) {
      startDateMonth = 0;
      startDateYear++;
    }
    onNavigation('next', 'month');
  };

  /**
   * Handles the "to next year" action in the date picker.
   */
  const toNextYear = () => {
    startDateYear++;
    onNavigation('next', 'year');
  };

  /**
   * Checks if a given date is today.
   *
   * @param {number} day - The day of the date.
   * @param {number} month - The month of the date (0-11).
   * @param {number} year - The year of the date.
   * @returns {boolean} - True if the date is today; otherwise, false.
   */
  const isToday = (day, month, year) => {
    return today && todayMonth === month && todayDay === day && todayYear === year;
  };

  /**
   * Handles the selection of a single date in the date picker.
   *
   * @param {number} timestamp - The timestamp of the selected date.
   */
  const handleSingleDate = (timestamp) => {
    startDate = updateTime('start', timestamp);

    if (!alwaysShow) {
      isOpen = false;
    }
  };

  /**
   * Handles the selection of a date range in the date picker.
   *
   * @param {number} timestamp - The timestamp of the selected date.
   */
  const handleDateRange = (timestamp) => {
    if (startDate === null || (startDate !== null && endDate !== null)) {
      startDate = updateTime('start', timestamp);
      endDate = null;
    } else {
      endDate = updateTime('end', timestamp);
      if (startDate > endDate) {
        [startDate, endDate] = [endDate, startDate];
      }

      if (!alwaysShow) {
        isOpen = false;
      }
    }
  };

  /**
   * Gets an array of dates within a specified range.
   *
   * @param {number} startDate - The timestamp of the start date.
   * @param {number} endDate - The timestamp of the end date.
   * @param {string[]} disabled - An array of disabled dates.
   * @returns {string[]} - An array of dates within the specified range.
   */
  const getDatesInRange = (startDate, endDate) => {
    const dateRangeStart = new Date(startDate);
    const dateRangeEnd = new Date(endDate);
    const datesInRange = [];

    for (; dateRangeStart <= dateRangeEnd; dateRangeStart.setDate(dateRangeStart.getDate() + 1)) {
      const formattedDate = `${
        dateRangeStart.getMonth() + 1
      }/${dateRangeStart.getDate()}/${dateRangeStart.getFullYear()}`;
      if (
        (!enabled && !disabled) ||
        (enabled.length && enabled.includes(formattedDate)) ||
        (disabled.length && !disabled.includes(formattedDate))
      ) {
        datesInRange.push(formattedDate);
      }
    }

    return datesInRange;
  };

  /**
   * Handles the click event on a day in the date picker.
   *
   * @param {Event} e - The click event.
   * @param {number} day - The day of the clicked date.
   * @param {number} month - The month of the clicked date.
   * @param {number} year - The year of the clicked date.
   */
  const onClick = function (e, day, month, year) {
    const classes = e.target?.closest('.date').className;

    if (classes.includes('future') || classes.includes('past') || classes.includes('disabled')) {
      e.preventDefault();
      return false;
    }

    const timestamp = createTimestamp(year, month, day);

    if (isRange) {
      prevStartDate = startDate;
      prevEndDate = endDate;

      handleDateRange(timestamp);
    } else {
      handleSingleDate(timestamp);
    }

    const event = {
      startDate,
      startDateTime,
      ...(isRange && {
        endDate,
        endDateTime,
        rangeDates: getDatesInRange(startDate, endDate)
      })
    };

    onDayClick(event);
  };

  /**
   * Checks if a date is within a specified range.
   *
   * @param {any} start - The start date of the range.
   * @param {any} end - The end date of the range.
   * @param {any} selected - The date to check.
   * @returns {boolean} - True if the date is within the range, false otherwise.
   */
  const isDateInRange = (start, end, selected) => {
    const startCompare = normalizeTimestamp(start);
    const endCompare = normalizeTimestamp(end);
    const selectedCompare = normalizeTimestamp(selected);

    return selectedCompare >= startCompare && selectedCompare <= endCompare;
  };

  /**
   * Checks if a given date is in the selected date range.
   *
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {boolean} - True if the date is in the selected range, false otherwise.
   */
  const inRange = (day, month, year) => {
    const selectedDateTimestamp = createTimestamp(year, month, day);

    if (normalizeTimestamp(startDate) === selectedDateTimestamp) {
      return true;
    }

    return isRange ? isDateInRange(startDate, endDate, selectedDateTimestamp) : startDate === selectedDateTimestamp;
  };

  /**
   * Checks if a given date is the first date in the selected range.
   *
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {boolean} - True if the date is the first date in the selected range, false otherwise.
   */
  const isFirstInRange = (day, month, year) => {
    const currentTimestamp = createTimestamp(year, month, day);
    const startCompare = normalizeTimestamp(startDate);
    const tempEndCompare = normalizeTimestamp(tempEndDate);
    const currentCompare = normalizeTimestamp(currentTimestamp);

    if ((!isRange && startCompare) || (isRange && !endDate && tempEndDate)) {
      return startCompare === currentCompare;
    }

    return isRange ? startCompare === currentCompare : tempEndCompare === currentCompare;
  };

  /**
   * Checks if a given date is the last date in the selected range.
   *
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {boolean} - True if the date is the last date in the selected range, false otherwise.
   */
  const isLastInRange = (day, month, year) => {
    const currentTimestamp = createTimestamp(year, month, day);
    const endCompare = normalizeTimestamp(endDate);
    const startCompare = normalizeTimestamp(startDate);
    const currentCompare = normalizeTimestamp(currentTimestamp);
    const tempEndCompare = normalizeTimestamp(tempEndDate);

    if (isRange && startDate && !endDate && tempEndDate) {
      return tempEndCompare === startCompare;
    }

    return isRange ? endCompare === currentCompare : startCompare === currentCompare;
  };

  /**
   * Checks if a given date is disabled.
   *
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {boolean} - True if the date is disabled, false otherwise.
   */
  const isDisabled = (day, month, year) => {
    const selectedDateTimestamp = createTimestamp(year, month, day);
    return (
      (!enabled && !disabled) ||
      (enabled.length && !enabled.map((d) => new Date(d).getTime()).includes(selectedDateTimestamp)) ||
      (disabled.length && disabled.map((d) => new Date(d).getTime()).includes(selectedDateTimestamp))
    );
  };

  /**
   * Checks if a given date is in the future.
   *
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {boolean} - True if the date is in the future, false otherwise.
   */
  const isFutureDate = (day, month, year) => {
    if (enableFutureDates) {
      return false;
    }

    const selectedDateTimestamp = createTimestamp(year, month, day);
    const todayCompare = normalizeTimestamp(new Date());
    const selectedCompare = normalizeTimestamp(selectedDateTimestamp);

    return todayCompare < selectedCompare;
  };

  /**
   * Checks if a given date is in the past.
   *
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {boolean} - True if the date is in the past, false otherwise.
   */
  const isPastDate = (day, month, year) => {
    if (enablePastDates) {
      return false;
    }

    const selectedDateTimestamp = createTimestamp(year, month, day);
    const todayCompare = normalizeTimestamp(new Date());
    const selectedCompare = normalizeTimestamp(selectedDateTimestamp);

    return todayCompare > selectedCompare;
  };

  /**
   * Checks if a given day is the first day of the month.
   *
   * @param {number} day - The day of the month.
   * @returns {boolean} - True if it's the first day of the month, false otherwise.
   */
  const isFirstDayOfMonth = (day) => {
    return day === 1;
  };

  /**
   * Checks if a given day is the last day of the month.
   *
   * @param {number} day - The day of the month.
   * @param {Array<number>} calendar - The calendar array.
   * @returns {boolean} - True if it's the last day of the month, false otherwise.
   */
  const isLastDayOfMonth = (day, calendar) => {
    return day === Math.max(...calendar.flat(10));
  };

  /**
   * Handles the mouse enter event for a day in the date picker.
   *
   * @param {Event} e - The mouse enter event.
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   */
  const onMouseEnter = function (e, day, month, year) {
    if (startDate && endDate) {
      tempEndDate = null;
      return;
    }

    const { className: classes } = e.target || {};

    if (classes.includes('future') || classes.includes('past') || classes.includes('disabled')) {
      return;
    }

    tempEndDate = createTimestamp(year, month, day);
  };

  /**
   * Handles the mouse leave event for a day in the date picker.
   */
  const onMouseLeave = () => {
    if (startDate && endDate) {
      tempEndDate = null;
      return;
    }

    tempEndDate = normalizeTimestamp(startDate);
  };

  /**
   * Checks if a given date is in the range during hover.
   *
   * @param {number} day - The day of the month.
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {boolean} - True if the date is in the range during hover, false otherwise.
   */
  const inRangeHover = (day, month, year) => {
    if (!isRange || endDate || !startDate || !tempEndDate) {
      return false;
    }

    const dateString = createTimestamp(year, month, day);
    const startCompare = normalizeTimestamp(startDate);
    const tempEndCompare = normalizeTimestamp(tempEndDate);
    const selectedCompare = normalizeTimestamp(dateString);

    const minDate = startCompare < tempEndCompare ? startCompare : tempEndCompare;
    const maxDate = startCompare > tempEndCompare ? startCompare : tempEndCompare;

    return selectedCompare >= minDate && selectedCompare <= maxDate;
  };

  /**
   * Handles a click event on a preset date range.
   *
   * @param {Object} preset - The preset date range object with start and end dates.
   * @param {number} preset.start - The start date of the preset range.
   * @param {number} preset.end - The end date of the preset range.
   */
  const onPresetClick = ({ start, end }) => {
    startDate = start;
    endDate = end;

    if (!alwaysShow) {
      isOpen = false;
    }
  };

  /**
   * Updates the time for a date and returns the timestamp.
   *
   * @param {string} which - 'start' or 'end' to indicate which date to update.
   * @param {number} timestamp - The timestamp to set.
   * @returns {number} - The updated timestamp.
   */
  const updateTime = (which, timestamp) => {
    const date = new Date(timestamp);

    if (!showTimePicker) {
      return date.getTime();
    }

    const [hours, minutes] = (which === 'start' ? startDateTime : endDateTime).split(':');

    date.setHours(hours);
    date.setMinutes(minutes);

    return date.getTime();
  };

  /**
   * Gets the hours and minutes from a given date.
   *
   * @param {Date} date - The date to extract hours and minutes from.
   * @returns {string} - A string in HH:mm format representing hours and minutes.
   */
  const getHoursAndMinutes = (date) => {
    date = new Date(date);

    if (!date) {
      return '00:00';
    }

    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
  };

  /**
   * Returns an array of timestamps from an array of date strings.
   * @param {string[]} collection - An array of date strings.
   * @returns {number[]} - An array of timestamps.
   */
  const getDatesFromArray = (collection) => {
    return collection.reduce((acc, date) => {
      let newDates = [];

      if (date instanceof Date) {
        newDates = [date.getTime()];
      } else if (typeof date === 'string' && date.includes(':')) {
        const [rangeStart, rangeEnd] = date.split(':');
        let dateRangeStart = new Date(rangeStart).getTime();
        let dateRangeEnd = new Date(rangeEnd).getTime();

        for (; dateRangeStart <= dateRangeEnd; dateRangeStart += MILLISECONDS_IN_DAY) {
          newDates = [...newDates, dateRangeStart];
        }
      } else {
        newDates = [new Date(date).getTime()];
      }

      return [...acc, ...newDates];
    }, []);
  };

  $: startDate = startDate ? getTimestamp(startDate) : null;
  $: endDate = endDate ? getTimestamp(endDate) : null;

  $: if (startDate || endDate) {
    updateCalendars();
  }

  $: todayMonth = today && today.getMonth();
  $: todayDay = today && today.getDate();
  $: todayYear = today && today.getFullYear();
  $: prev = calendarize(new Date(startDateYear, startDateMonth - 1), startOfWeek);
  $: startDateCalendar = calendarize(new Date(startDateYear, startDateMonth), startOfWeek);
  $: next = calendarize(new Date(startDateYear, startDateMonth + 1), startOfWeek);
  $: endDateMonth = startDateMonth === 11 ? 0 : startDateMonth + 1;
  $: endDateYear = endDateMonth === 0 ? startDateYear + 1 : startDateYear;
  $: endDateCalendar = calendarize(new Date(endDateYear, endDateMonth), startOfWeek);
  $: !isRange && (endDate = null);
  $: theme !== null && document.documentElement.setAttribute('data-picker-theme', theme);
  $: disabled = getDatesFromArray(disabledDates);
  $: enabled = getDatesFromArray(enabledDates);

  $: if (!startDate && !endDate) {
    startDateYear = Number(defaultYear);
    startDateMonth = Number(defaultMonth);
  }

  $: if (isRange !== null || (startDate && tempEndDate !== null) || !isOpen) {
    updateCalendars();
  }

  $: if (isOpen) {
    if ((!isRange && startDate) || (isRange && startDate && endDate)) {
      const date = new Date(startDate);
      startDateYear = date.getFullYear();
      startDateMonth = date.getMonth();
    }
  }

  $: if (startDate && showTimePicker && !initialize) {
    startDateTime = getHoursAndMinutes(startDate);
    endDateTime = getHoursAndMinutes(endDate);
    initialize = true;
  }
</script>

<div class="datepicker" data-picker-theme={theme} use:clickOutside={{ onClickOutside }}>
  <slot />
  <div
    class="calendars-container"
    class:right={align === 'right'}
    class:range={isRange && isMultipane}
    class:presets={isRange && showPresets}
    class:show={isOpen}
  >
    {#if isRange && showPresets}
      <div class="calendar-presets">
        {#each presetRanges as option}
          <button
            class:active={normalizeTimestamp(startDate) === normalizeTimestamp(option.start) &&
              normalizeTimestamp(endDate) === normalizeTimestamp(option.end)}
            on:click={() => onPresetClick({ ...option })}
          >
            {option.label}
          </button>
        {/each}
      </div>
    {/if}
    <div class="calendar">
      <header class:timepicker={showTimePicker}>
        <button on:click={toPrev}>
          <div class="icon-previous-month" aria-label="Previous month"></div>
        </button>
        <span>
          <div>{monthLabels[startDateMonth]} {startDateYear}</div>

          {#if showYearControls}
            <div class="years">
              <button on:click={toNextYear}>
                <i class="icon-next-year" aria-label="Next year" />
              </button>
              <button on:click={toPrevYear}>
                <i class="icon-previous-year" aria-label="Previous year" />
              </button>
            </div>
          {/if}
        </span>
        <button on:click={toNext} class:hide={!(!isRange || (isRange && !isMultipane))}>
          <div class="icon-next-month" aria-label="Next month"></div>
        </button>
      </header>

      {#if showTimePicker}
        <div class="timepicker" class:show={isRange && !isMultipane}>
          <input type="time" bind:value={startDateTime} on:input={() => (startDate = updateTime('start', startDate))} />

          {#if isRange}
            <input
              type="time"
              class="end-time"
              bind:value={endDateTime}
              on:input={() => (endDate = updateTime('end', endDate))}
            />
          {/if}
        </div>
      {/if}

      <div class="month">
        {#each dowLabels as text, labelIndex (text)}
          <span class="dow">{dowLabels[(labelIndex + startOfWeek) % 7]}</span>
        {/each}

        {#each { length: 6 } as week, weekIndex (weekIndex)}
          {#if startDateCalendar[weekIndex]}
            {#each { length: 7 } as d, dayIndex (dayIndex)}
              {#if startDateCalendar[weekIndex][dayIndex] !== 0}
                <button
                  class="date"
                  class:today={isToday(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:start={isFirstInRange(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:end={isLastInRange(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:range={inRange(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:rangehover={inRangeHover(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:past={isPastDate(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:future={isFutureDate(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:first={isFirstDayOfMonth(startDateCalendar[weekIndex][dayIndex])}
                  class:last={isLastDayOfMonth(startDateCalendar[weekIndex][dayIndex], startDateCalendar)}
                  class:disabled={isDisabled(startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  on:mouseenter={(e) =>
                    onMouseEnter(e, startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  on:mouseleave={onMouseLeave}
                  on:click={(e) => onClick(e, startDateCalendar[weekIndex][dayIndex], startDateMonth, startDateYear)}
                  class:norange={isRange && tempEndDate === startDate}
                >
                  <span>{startDateCalendar[weekIndex][dayIndex]}</span>
                </button>
              {:else}
                <div class="date other">&nbsp;</div>
              {/if}
            {/each}
          {/if}
        {/each}
      </div>
    </div>

    {#if isRange && isMultipane}
      <div class="calendar">
        <header class:timepicker={showTimePicker}>
          <button on:click={toPrev} class:hide={!(!isRange || (isRange && !isMultipane))}>
            <div class="icon-previous-month" aria-label="Previous month"></div>
          </button>
          <span>
            <div>{monthLabels[endDateMonth]} {endDateYear}</div>

            {#if showYearControls}
              <div class="years">
                <button on:click={toNextYear}>
                  <i class="icon-next-year" aria-label="Next year" />
                </button>
                <button on:click={toPrevYear}>
                  <i class="icon-previous-year" aria-label="Previous year" />
                </button>
              </div>
            {/if}
          </span>
          <button on:click={toNext}>
            <div class="icon-next-month" aria-label="Next month"></div>
          </button>
        </header>

        {#if showTimePicker}
          <div class="timepicker">
            <input type="time" bind:value={endDateTime} on:input={() => (endDate = updateTime('end', endDate))} />
          </div>
        {/if}

        <div class="month">
          {#each dowLabels as text, labelIndex (text)}
            <span class="dow">{dowLabels[(labelIndex + startOfWeek) % 7]}</span>
          {/each}

          {#each { length: 6 } as week, weekIndex (weekIndex)}
            {#if endDateCalendar[weekIndex]}
              {#each { length: 7 } as d, dayIndex (dayIndex)}
                {#if endDateCalendar[weekIndex][dayIndex] !== 0}
                  <button
                    class="date"
                    class:today={isToday(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:range={inRange(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:rangehover={inRangeHover(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:start={isFirstInRange(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:end={isLastInRange(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:past={isPastDate(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:future={isFutureDate(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:first={isFirstDayOfMonth(endDateCalendar[weekIndex][dayIndex])}
                    class:last={isLastDayOfMonth(endDateCalendar[weekIndex][dayIndex], endDateCalendar)}
                    class:disabled={isDisabled(endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    on:mouseenter={(e) =>
                      onMouseEnter(e, endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    on:mouseleave={onMouseLeave}
                    on:click={(e) => onClick(e, endDateCalendar[weekIndex][dayIndex], endDateMonth, endDateYear)}
                    class:norange={isRange && tempEndDate === startDate}
                  >
                    <span>{endDateCalendar[weekIndex][dayIndex]}</span>
                  </button>
                {:else}
                  <div class="date other">&nbsp;</div>
                {/if}
              {/each}
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
  />
</svelte:head>

<style>
  :root {
    /**
     * Common
     */
    --datepicker-border-color: #e8e9ea;

    --datepicker-border-radius-small: 0.125rem;
    --datepicker-border-radius-base: 0.25rem;
    --datepicker-border-radius-large: 0.5rem;
    --datepicker-border-radius-xlarge: 0.75rem;
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
    --datepicker-calendar-padding: var(--datepicker-padding-base) var(--datepicker-padding-large)
      var(--datepicker-padding-xlarge);
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

    --datepicker-calendar-header-month-nav-icon-next-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACLSURBVHgB7ZTLCYAwEERHbcASUpIlaAd2YDoxlmIX3ixFEwwYQQL5kCWwD94ph5mwywIMUzmLlYRBe1lXENBrT+oSgktwiepLNJ63EWkl3AOltBMCkHh/kEv5F9SCGN8IzKntEYfAdwQb0kYaHO4uoUJBBIdzOAoiKMMNQ47wDvEceA7Zrp3BMLVyA56LVFYQOkngAAAAAElFTkSuQmCC')
      no-repeat center center;
    --datepicker-calendar-header-month-nav-icon-next-background-size: 16px 16px;
    --datepicker-calendar-header-month-nav-icon-next-filter: invert(0);
    --datepicker-calendar-header-month-nav-icon-next-height: 16px;
    --datepicker-calendar-header-month-nav-icon-next-margin: auto;
    --datepicker-calendar-header-month-nav-icon-next-width: 16px;

    --datepicker-calendar-header-month-nav-icon-prev-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACKSURBVHgB7ZbBDYAgDEW/xgEcgZHcQDYRJ5ER3EhHcAPtAQMHQwIiSNKXvAMH+CUNDQDDVM5kLMJCnsYBmXHDN1IgIxzO4QIZ+Ty8gT9cOuuZ3BHHQa4hGxTszVOpnoJaFMbXAk2OzvpNC+7zojYVewFcBBdRVRE9CqCR4EvWIR4JO5iC5jzD/IoLU/FXPXheCj0AAAAASUVORK5CYII=')
      no-repeat center center;
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

    --datepicker-calendar-header-year-nav-icon-next-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABuSURBVHgB7c7BCYAwDIXhBy7gKB2hm9Vx3UJzqCASRWOTHvo+yDG8HyAiGt2Ef7LcLLeigyK31SsIdh4Pj9DGwyKu40u9kAht/OAe8TTuHvFm3C3iy3jziGQYv4vIMMjGcS0iwSjBWN/on4hoADu88UW4KXFVfgAAAABJRU5ErkJggg==')
      no-repeat center center;
    --datepicker-calendar-header-year-nav-icon-next-background-size: 12px 12px;
    --datepicker-calendar-header-year-nav-icon-next-display: block;
    --datepicker-calendar-header-year-nav-icon-next-filter: invert(0);
    --datepicker-calendar-header-year-nav-icon-next-height: 12px;
    --datepicker-calendar-header-year-nav-icon-next-width: 12px;

    --datepicker-calendar-header-year-nav-icon-prev-background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB3SURBVHgB7dTRCYAwDATQAxdwlI6QzZpx3UIrKJSC1aS2fngP7kvi3VcBIqK/m26+S8qcssBHWu5Dynokwi5m9wIHyX5gHRGL2wAndYwoyxWN1DDi9XLLiG7lT0Z0L6+NGFZ+NWJoeW2EYjD9svy0PzACIiJqsAHF2EaCcjFGaQAAAABJRU5ErkJggg==')
      no-repeat center center;
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
  }

  .datepicker {
    font-size: var(--datepicker-font-size-base);
    position: relative;
  }

  .datepicker * {
    box-sizing: border-box;
  }

  .datepicker .calendars-container {
    background: var(--datepicker-container-background);
    border: 1px solid var(--datepicker-container-border);
    border-radius: var(--datepicker-container-border-radius);
    box-shadow: var(--datepicker-container-box-shadow);
    display: none;
    font-family: var(--datepicker-container-font-family);
    grid-template-columns: 1fr;
    left: var(--datepicker-container-left);
    position: var(--datepicker-container-position);
    width: var(--datepicker-container-width);
    z-index: var(--datepicker-container-zindex);
  }

  .datepicker .calendars-container.right {
    left: auto;
    right: 0;
  }

  .datepicker .calendars-container.show {
    display: grid;
    top: 105%;
  }

  .datepicker .calendars-container.range {
    grid-template-columns: repeat(2, 1fr);
  }

  .datepicker .calendars-container.presets {
    grid-template-columns: minmax(var(--datepicker-presets-minwidth), var(--datepicker-presets-maxwidth)) 1fr 1fr;
  }

  .datepicker .calendars-container.presets:not(.range) {
    grid-template-columns: minmax(var(--datepicker-presets-minwidth), var(--datepicker-presets-maxwidth)) 1fr;
  }

  .datepicker .calendars-container.presets .calendar-presets {
    display: flex;
  }

  .datepicker .calendars-container .calendar-presets {
    border-right: var(--datepicker-presets-border);
    display: none;
    flex-direction: column;
    padding: var(--datepicker-presets-padding);
  }

  .datepicker .calendars-container .calendar-presets button {
    appearance: none;
    background-color: var(--datepicker-presets-button-background);
    box-sizing: border-box;
    border: var(--datepicker-presets-button-border);
    border-radius: var(--datepicker-presets-button-border-radius);
    color: var(--datepicker-presets-button-color);
    cursor: var(--datepicker-presets-button-cursor);
    font-family: var(--datepicker-presets-button-font-family);
    font-size: var(--datepicker-presets-button-font-size);
    margin: var(--datepicker-presets-button-margin);
    padding: var(--datepicker-presets-button-padding);
    text-align: var(--datepicker-presets-button-text-align);
  }

  .datepicker .calendars-container .calendar-presets button:hover {
    background-color: var(--datepicker-presets-button-background-hover);
    color: var(--datepicker-presets-button-color-hover);
  }

  .datepicker .calendars-container .calendar-presets button.active {
    background-color: var(--datepicker-presets-button-background-active);
    color: var(--datepicker-presets-button-color-active);
    cursor: var(--datepicker-presets-button-cursor-active);
    font-weight: var(--datepicker-presets-button-font-weight-active);
  }

  .datepicker .calendars-container .calendar-presets button:focus-visible {
    border-radius: var(--datepicker-presets-button-border-radius-active);
    outline: var(--datepicker-presets-button-outline-focus);
    z-index: var(--datepicker-presets-button-zindex-focus);
  }

  .datepicker .calendars-container .calendar {
    border: var(--datepicker-calendar-border);
    padding: var(--datepicker-calendar-padding);
    position: var(--datepicker-calendar-position);
    width: var(--datepicker-calendar-width);
  }

  .datepicker .calendars-container .calendar + .calendar {
    border-left: var(--datepicker-calendar-split-border);
  }

  .datepicker .calendars-container .calendar header {
    align-items: var(--datepicker-calendar-header-align-items);
    color: var(--datepicker-calendar-header-color);
    display: var(--datepicker-calendar-header-display);
    font-size: var(--datepicker-calendar-header-font-size);
    justify-content: var(--datepicker-calendar-header-justify-content);
    margin: var(--datepicker-calendar-header-margin);
    padding: var(--datepicker-calendar-header-padding);
    user-select: var(--datepicker-calendar-header-user-select);
  }

  .datepicker .calendars-container .calendar header button {
    appearance: none;
    background: var(--datepicker-calendar-header-month-nav-background);
    border: var(--datepicker-calendar-header-month-nav-border);
    border-radius: var(--datepicker-calendar-header-month-nav-border-radius);
    color: var(--datepicker-calendar-header-month-nav-color);
    cursor: var(--datepicker-calendar-header-month-nav-cursor);
    font-size: var(--datepicker-calendar-header-month-nav-font-size);
    height: var(--datepicker-calendar-header-month-nav-height);
    margin-left: var(--datepicker-calendar-header-month-nav-margin-left);
    padding: var(--datepicker-calendar-header-month-nav-padding);
    text-align: var(--datepicker-calendar-header-month-nav-text-align);
    width: var(--datepicker-calendar-header-month-nav-width);
  }

  .datepicker .calendars-container .calendar header > span {
    align-items: var(--datepicker-calendar-header-text-align-items);
    color: var(--datepicker-calendar-header-text-color);
    display: var(--datepicker-calendar-header-text-display);
    font-size: var(--datepicker-calendar-header-text-font-size);
    font-weight: var(--datepicker-calendar-header-text-font-weight);
    gap: var(--datepicker-calendar-header-text-gap);
  }

  .datepicker .calendars-container .calendar header > span + button {
    margin-left: 0;
    margin-right: -8px;
  }

  .datepicker .calendars-container .calendar header > span .years {
    align-items: var(--datepicker-calendar-header-year-align-items);
    display: var(--datepicker-calendar-header-year-display);
    flex-direction: var(--datepicker-calendar-header-year-flex-direction);
    margin: var(--datepicker-calendar-header-year-margin);
  }

  .datepicker .calendars-container .calendar header > span .years button {
    display: var(--datepicker-calendar-header-year-nav-display);
    color: var(--datepicker-calendar-header-year-nav-color);
    height: var(--datepicker-calendar-header-year-nav-height);
    line-height: var(--datepicker-calendar-header-year-nav-line-height);
    margin: var(--datepicker-calendar-header-year-nav-margin);
    padding: var(--datepicker-calendar-header-year-nav-padding);
    width: var(--datepicker-calendar-header-year-nav-width);
  }

  .datepicker .calendars-container .calendar header > span .years button i {
    font-size: var(--datepicker-calendar-header-year-nav-icon-font-size);
  }

  .datepicker .calendars-container .calendar header button.hide {
    opacity: 0;
  }

  .datepicker .calendars-container .calendar header button:hover {
    background: var(--datepicker-calendar-header-month-nav-background-hover);
  }

  .datepicker .calendars-container .calendar header.timepicker {
    margin-bottom: 0;
  }

  .datepicker .calendars-container .calendar .timepicker {
    align-items: var(--datepicker-timepicker-container-align-items);
    display: var(--datepicker-timepicker-container-display);
    justify-content: var(--datepicker-timepicker-container-justify-content);
    margin-bottom: var(--datepicker-timepicker-container-margin-bottom);
  }

  .datepicker .calendars-container .calendar .timepicker input[type='time'] {
    border: var(--datepicker-timepicker-input-border);
    border-radius: var(--datepicker-timepicker-input-border-radius);
    display: var(--datepicker-timepicker-input-display);
    font-family: var(--datepicker-timepicker-input-font-family);
    margin: var(--datepicker-timepicker-input-margin);
    padding: var(--datepicker-timepicker-input-padding);
  }

  .datepicker .calendars-container .calendar .timepicker input[type='time'].end-time {
    display: none;
  }

  .datepicker .calendars-container .calendar .timepicker.show input[type='time'].end-time {
    display: block;
  }

  .datepicker .calendars-container .calendar header button:focus-visible,
  .datepicker .calendars-container .calendar .date:focus-visible {
    border-radius: 20px;
    outline: 5px auto -webkit-focus-ring-color;
    z-index: 10;
  }

  .datepicker .calendars-container .calendar .month {
    display: var(--datepicker-calendar-container-display);
    grid-template-columns: var(--datepicker-calendar-container-grid-template-columns);
    grid-gap: var(--datepicker-calendar-container-grid-gap);
    width: var(--datepicker-calendar-container-display);
  }

  .datepicker .calendars-container .calendar .dow {
    color: var(--datepicker-calendar-dow-color);
    font-size: var(--datepicker-calendar-dow-font-size);
    font-weight: var(--datepicker-calendar-dow-font-weight);
    margin-bottom: var(--datepicker-calendar-dow-margin-bottom);
    text-align: var(--datepicker-calendar-dow-text-align);
  }

  .datepicker .calendars-container .calendar .date {
    appearance: var(--datepicker-calendar-day-container-appearance);
    background: var(--datepicker-calendar-day-container-background);
    border: var(--datepicker-calendar-day-container-border);
    margin: var(--datepicker-calendar-day-container-margin);
    padding: var(--datepicker-calendar-day-container-padding);
    position: var(--datepicker-calendar-day-container-position);
    text-align: var(--datepicker-calendar-day-container-text-align);
  }

  .datepicker .calendars-container .calendar .date span {
    align-items: var(--datepicker-calendar-day-align-items);
    border: var(--datepicker-calendar-day-border);
    border-radius: var(--datepicker-calendar-day-border-radius);
    color: var(--datepicker-calendar-day-color);
    cursor: var(--datepicker-calendar-day-cursor);
    display: var(--datepicker-calendar-day-display);
    height: var(--datepicker-calendar-day-height);
    justify-content: var(--datepicker-calendar-day-justify-content);
    font-family: var(--datepicker-calendar-day-font-family);
    font-size: var(--datepicker-calendar-day-font-size);
    margin-bottom: var(--datepicker-calendar-day-margin-bottom);
    padding: var(--datepicker-calendar-day-padding);
    text-align: var(--datepicker-calendar-day-text-align);
    width: var(--datepicker-calendar-day-width);
  }

  .datepicker
    .calendars-container
    .calendar
    .date:not(.other):not(.range):not(.future):not(.past):not(.disabled)
    span:hover {
    background-color: var(--datepicker-calendar-day-background-hover);
    color: var(--datepicker-calendar-day-color-hover);
  }

  .datepicker .calendars-container .calendar .date:focus {
    z-index: var(--datepicker-calendar-day-zindex-focus);
  }

  .datepicker .calendars-container .calendar .date.disabled span,
  .datepicker .calendars-container .calendar .date.past span,
  .datepicker .calendars-container .calendar .date.future span {
    color: var(--datepicker-calendar-day-color-disabled);
    cursor: var(--datepicker-calendar-day-cursor-disabled);
  }

  .datepicker .calendars-container .calendar .date.today span {
    background: var(--datepicker-calendar-today-background);
    border: var(--datepicker-calendar-today-border);
    cursor: var(--datepicker-calendar-today-cursor);
    font-weight: var(--datepicker-calendar-today-font-weight);
  }

  .datepicker .calendars-container .calendar .date.rangehover span,
  .datepicker .calendars-container .calendar .date.range span {
    background: var(--datepicker-calendar-range-background);
    border: var(--datepicker-calendar-range-border);
    border-radius: var(--datepicker-calendar-range-border-radius);
    color: var(--datepicker-calendar-range-color);
    cursor: var(--datepicker-calendar-range-cursor);
    font-weight: var(--datepicker-calendar-range-font-weight);
  }

  .datepicker .calendars-container .calendar .date.rangehover.start,
  .datepicker .calendars-container .calendar .date.range.start {
    box-shadow: var(--datepicker-calendar-range-start-box-shadow);
    height: var(--datepicker-calendar-day-height);
  }

  .datepicker .calendars-container .calendar .date.rangehover.end,
  .datepicker .calendars-container .calendar .date.range.end {
    box-shadow: var(--datepicker-calendar-range-end-box-shadow);
    height: var(--datepicker-calendar-day-height);
  }

  .datepicker .calendars-container .calendar .date.rangehover.start span,
  .datepicker .calendars-container .calendar .date.range.start span,
  .datepicker .calendars-container .calendar .date.rangehover.end span,
  .datepicker .calendars-container .calendar .date.range.end span {
    background-color: var(--datepicker-calendar-range-selected-background);
    border-radius: var(--datepicker-calendar-range-selected-border-radius);
    color: var(--datepicker-calendar-range-selected-color);
    font-weight: var(--datepicker-calendar-range-selected-font-weight);
  }

  .datepicker .calendars-container .calendar .date.rangehover.first span,
  .datepicker .calendars-container .calendar .date.range.first span,
  .datepicker .calendars-container .calendar .date.rangehover:nth-last-child(7n):not(.start):not(.end) span,
  .datepicker .calendars-container .calendar .date.range:nth-last-child(7n):not(.start):not(.end) span {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
  }

  .datepicker .calendars-container .calendar .date.rangehover.last span,
  .datepicker .calendars-container .calendar .date.range.last span,
  .datepicker .calendars-container .calendar .date.rangehover:nth-child(7n):not(.start):not(.end) span,
  .datepicker .calendars-container .calendar .date.range:nth-child(7n):not(.start):not(.end) span {
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
  }

  .datepicker .calendars-container .calendar .date.rangehover.disabled span,
  .datepicker .calendars-container .calendar .date.range.disabled span {
    background: var(--datepicker-calendar-range-background-disabled);
    color: var(--datepicker-calendar-range-color-disabled);
  }

  .datepicker .calendars-container .calendar .date.rangehover.start.end,
  .datepicker .calendars-container .calendar .date.range.start.end {
    box-shadow: none;
  }

  .datepicker .calendars-container .calendar .date:not(.rangehover) + .rangehover:not(.end),
  .datepicker .calendars-container .calendar .date:not(.rangehover) + .rangehover.start {
    box-shadow: var(--datepicker-calendar-range-start-box-shadow-selected) !important;
    height: var(--datepicker-calendar-day-height);
  }

  .datepicker .calendars-container .calendar .date:not(.rangehover) + .rangehover span,
  .datepicker .calendars-container .calendar .date:not(.rangehover) + .rangehover.start span {
    border-radius: var(--datepicker-calendar-range-selected-start-border-radius);
  }

  .datepicker .calendars-container .calendar .date.rangehover span {
    background-color: var(--datepicker-calendar-range-included-background);
    color: var(--datepicker-calendar-range-included-color);
    font-weight: var(--datepicker-calendar-range-included-font-weight);
  }

  .datepicker .calendars-container .calendar .date.rangehover:hover {
    box-shadow: var(--datepicker-calendar-range-included-box-shadow);
    height: var(--datepicker-calendar-range-included-height);
  }

  .datepicker .calendars-container .calendar .date.rangehover:hover span {
    border-radius: 20px;
    font-weight: var(--datepicker-font-weight-medium);
  }

  .datepicker .calendars-container .calendar .date.rangehover.first:hover,
  .datepicker .calendars-container .calendar .date.rangehover.start {
    box-shadow: var(--datepicker-calendar-range-start-box-shadow-selected);
    height: var(--datepicker-calendar-day-height);
  }

  .datepicker .calendars-container .calendar .date.rangehover:not(.start) + .start,
  .datepicker .calendars-container .calendar .date.rangehover.end {
    box-shadow: var(--datepicker-calendar-range-end-box-shadow-selected);
    height: var(--datepicker-calendar-day-height);
  }

  .datepicker .calendars-container .calendar .date.rangehover:not(.start) + .start span {
    border-radius: 20px;
  }

  .datepicker .calendars-container .calendar .date.rangehover.start span,
  .datepicker .calendars-container .calendar .date.rangehover.end span {
    background-color: var(--datepicker-calendar-range-start-end-background);
    color: var(--datepicker-calendar-range-start-end-color);
  }

  .datepicker .calendars-container .calendar .date.rangehover.start.norange {
    box-shadow: none !important;
  }

  .datepicker .calendars-container .calendar .date.rangehover.disabled span {
    background-color: var(--datepicker-calendar-range-background-disabled);
    color: var(--datepicker-calendar-range-color-disabled);
  }

  .datepicker .calendars-container .calendar .date.other {
    border: var(--datepicker-calendar-day-other-border);
    box-shadow: var(--datepicker-calendar-day-other-box-shadow);
    color: var(--datepicker-calendar-day-other-color);
  }

  .icon-next-month {
    background: var(--datepicker-calendar-header-month-nav-icon-next-background);
    background-size: var(--datepicker-calendar-header-month-nav-icon-next-background-size);
    filter: var(--datepicker-calendar-header-month-nav-icon-next-filter);
    height: var(--datepicker-calendar-header-month-nav-icon-next-height);
    margin: var(--datepicker-calendar-header-month-nav-icon-next-margin);
    width: var(--datepicker-calendar-header-month-nav-icon-next-width);
  }

  .icon-previous-month {
    background: var(--datepicker-calendar-header-month-nav-icon-prev-background);
    background-size: var(--datepicker-calendar-header-month-nav-icon-prev-background-size);
    filter: var(--datepicker-calendar-header-month-nav-icon-prev-filter);
    height: var(--datepicker-calendar-header-month-nav-icon-prev-height);
    margin: var(--datepicker-calendar-header-month-nav-icon-prev-margin);
    width: var(--datepicker-calendar-header-month-nav-icon-prev-width);
  }

  .icon-next-year {
    background: var(--datepicker-calendar-header-year-nav-icon-next-background);
    background-size: var(--datepicker-calendar-header-year-nav-icon-next-background-size);
    display: var(--datepicker-calendar-header-year-nav-icon-next-display);
    filter: var(--datepicker-calendar-header-year-nav-icon-next-filter);
    height: var(--datepicker-calendar-header-year-nav-icon-next-height);
    width: var(--datepicker-calendar-header-year-nav-icon-next-width);
  }

  .icon-previous-year {
    background: var(--datepicker-calendar-header-year-nav-icon-prev-background);
    background-size: var(--datepicker-calendar-header-year-nav-icon-prev-background-size);
    display: var(--datepicker-calendar-header-year-nav-icon-prev-display);
    filter: var(--datepicker-calendar-header-year-nav-icon-prev-filter);
    height: var(--datepicker-calendar-header-year-nav-icon-prev-height);
    width: var(--datepicker-calendar-header-year-nav-icon-prev-width);
  }

  @media only screen and (max-width: 800px) {
    .datepicker .calendars-container.show {
      display: flex;
      flex-direction: column;
    }

    .datepicker .calendars-container.presets .calendar-presets {
      border-right: 0;
      border-bottom: var(--datepicker-presets-border);
    }

    .datepicker .calendars-container .calendar .timepicker {
      align-items: center;
      display: flex;
    }

    .datepicker .calendars-container .calendar .timepicker input[type='time'].end-time {
      display: block;
    }

    .datepicker .calendars-container .calendar + .calendar {
      display: none;
    }

    .datepicker .calendars-container .calendar header button.hide {
      opacity: 1;
    }
  }
</style>
