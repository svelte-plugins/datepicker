<script>
  import { DatePicker } from '@svelte-plugins/datepicker';

  import { RangePicker, SinglePicker, ThemePicker } from './examples';

  const today = new Date();

  const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

  const getDateFromToday = (days) => {
    return Date.now() - days * MILLISECONDS_IN_DAY;
  };
</script>

<main>
	<section>
		<h1>@svelte-plugins/datepicker <a href="https://github.com/dysfunc">(dysfunc)</a></h1>
		<p>A simple datepicker component written in Svelte.</p>
	</section>

  <hr />

  <section>
    <h2>Overview</h2>

    The <code>DatePicker</code> component allows users to easily select a date or date-range from one or more calendars.

    <div class="showcase">
      <form on:submit={() => console.log('okoko')}>
        <DatePicker startDate={getDateFromToday(29)} endDate={today} showYearControls={false} isMultipane showPresets isRange isOpen alwaysShow />
      </form>
    </div>
  </section>

  <section>
    <h2>Props</h2>

    <table class="table">
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Default</th>
      </tr>
      <tr>
        <td>startDate</td>
        <td><code>object</code></td>
        <td>The start date <code>string</code> or <code>date</code> object.</td>
        <td><code>null</code></td>
      </tr>
      <tr>
        <td>endDate</td>
        <td><code>object</code></td>
        <td>The end date <code>string</code> or <code>date</code> object.</td>
        <td><code>null</code></td>
      </tr>
      <tr>
        <td>startDateTime</td>
        <td><code>string</code></td>
        <td>The start date time <code>string</code> in 24 hour format.</td>
        <td><code>00:00</code></td>
      </tr>
      <tr>
        <td>endDateTime</td>
        <td><code>string</code></td>
        <td>The end date time <code>string</code> in 24 hour format.</td>
        <td><code>00:00</code></td>
      </tr>
      <tr>
        <td>defaultYear</td>
        <td><code>number</code></td>
        <td>The year you want to show as the default.</td>
        <td><code>{today.getFullYear()}</code></td>
      </tr>
      <tr>
        <td>align</td>
        <td><code>string</code></td>
        <td>
          The edge alignment of the datepicker.
          <div><small>Accepted values <b>left</b> or <b>right</b></small></div>
        </td>
        <td><code>left</code></td>
      </tr>
      <tr>
        <td>isRange</td>
        <td><code>boolean</code></td>
        <td>Changes the date picker into a range picker and allows start and end date selection.</td>
        <td><code>false</code></td>
      </tr>
      <tr>
        <td>isMultipane</td>
        <td><code>boolean</code></td>
        <td>If <code>true</code>, two calendar months will be shown side-by-side instead of one.</td>
        <td><code>false</code></td>
      </tr>
      <tr>
        <td>isOpen</td>
        <td><code>boolean</code></td>
        <td>If <code>true</code>, the picker will be shown without user interaction.</td>
        <td><code>false</code></td>
      </tr>
      <tr>
        <td>showPresets</td>
        <td><code>boolean</code></td>
        <td>If <code>true</code>, the picker will show the preset ranges for selection.</td>
        <td><code>false</code></td>
      </tr>
      <tr>
        <td>showYearControls</td>
        <td><code>boolean</code></td>
        <td>If <code>true</code>, the picker will hide the year navigation controls.</td>
        <td><code>false</code></td>
      </tr>
      <tr>
        <td>showTimePicker</td>
        <td><code>boolean</code></td>
        <td>If <code>true</code>, the picker will show the time picker.</td>
        <td><code>false</code></td>
      </tr>
      <tr>
        <td>enableFutureDates</td>
        <td><code>boolean</code></td>
        <td>If <code>true</code>, the picker will allow the user to select future dates.</td>
        <td><code>false</code></td>
      </tr>
      <tr>
        <td>enablePastDates</td>
        <td><code>boolean</code></td>
        <td>If disabled, the picker will prevent the user from selecting anything prior to today.</td>
        <td><code>true</code></td>
      </tr>
      <tr>
        <td>theme</td>
        <td><code>string</code></td>
        <td>The theme name will be assigned to the theme <b>data-attribute</b> <code>datepicker.[data-picker-theme="theme_value_here"]`</code>.</td>
        <td><code>empty</code></td>
      </tr>
      <tr>
        <td valign="top">defaultMonth</td>
        <td valign="top"><code>number</code></td>
        <td>
          The month you want to show as the default.
          <div><small>Accepted values <b>0-11</b></small></div>
          <br/>
          <ul class="clean">
            <li><b>0</b> - January</li>
            <li><b>1</b> - February</li>
            <li><b>2</b> - March</li>
            <li><b>3</b> - April</li>
            <li><b>4</b> - May</li>
            <li><b>5</b> - June</li>
            <li><b>6</b> - July</li>
            <li><b>7</b> - August</li>
            <li><b>8</b> - September</li>
            <li><b>9</b> - October</li>
            <li><b>10</b> - November</li>
            <li><b>11</b> - December</li>
          </ul>
        </td>
        <td valign="top"><code>{today.getMonth()}</code></td>
      </tr>
      <tr>
        <td valign="top">startOfWeek</td>
        <td valign="top"><code>number</code></td>
        <td>
          Defines what day will start your week.
          <div><small>Accepted values <b>0-6</b></small></div>

          <br/>
          <ul class="clean">
            <li><b>0</b> - Sunday</li>
            <li><b>1</b> - Monday</li>
            <li><b>2</b> - Tuesday</li>
            <li><b>3</b> - Wednesday</li>
            <li><b>4</b> - Thursday</li>
            <li><b>5</b> - Friday</li>
            <li><b>6</b> - Saturday</li>
          </ul>
        </td>
        <td valign="top"><code>0</code></td>
      </tr>
      <tr>
        <td valign="top">disabledDates</td>
        <td valign="top"><code>array</code></td>
        <td>
          Determines which dates will be disabled.
          <div><small>Accepted format <b>'MM/DD/YYYY'</b></small></div>

          <br/>

          <ul class="clean">
            <li><code>['1/1/2023']</code> - Disables January 1st, 2023</li>
            <li><code>['1/1/2023', '1/2/2023']</code> - Disables January 1st and 2nd, 2023</li>
            <li><code>['1/1/2023:1/10/2023']</code> - Disables the range January 1st to 10th, 2023</li>
          </ul>
        </td>
        <td valign="top"><code>[]</code></td>
      </tr>
      <tr>
        <td valign="top">enabledDates</td>
        <td valign="top"><code>array</code></td>
        <td>
          Determines which dates will be enabled only.
          <div><small>Accepted format <b>'MM/DD/YYYY'</b></small></div>

          <br/>

          <ul class="clean">
            <li><code>['1/1/2023']</code> - Enables January 1st, 2023</li>
            <li><code>['1/1/2023', '1/2/2023']</code> - Enables January 1st and 2nd, 2023</li>
            <li><code>['1/1/2023:1/10/2023']</code> - Enables the range January 1st to 10th, 2023</li>
          </ul>
        </td>
        <td valign="top"><code>[]</code></td>
      </tr>
      <tr>
        <td valign="top">dowLabels</td>
        <td valign="top"><code>array</code></td>
        <td valign="top">An array of strings containing the days of the week.</td>
        <td valign="top">
          [&nbsp;&nbsp;
          <ul class="clean">
            <li>&nbsp;&nbsp;<code>"Su"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Mo"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Tu"</code>,</li>
            <li>&nbsp;&nbsp;<code>"We"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Th"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Fr"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Sa"</code></li>
          </ul>]
        </td>
      </tr>
      <tr>
        <td valign="top">monthLabels</td>
        <td valign="top"><code>array</code></td>
        <td valign="top">An array of strings containing the months of the year.</td>
        <td valign="top">
          [&nbsp;&nbsp;
          <ul class="clean">
            <li>&nbsp;&nbsp;<code>"January"</code>,</li>
            <li>&nbsp;&nbsp;<code>"February"</code>,</li>
            <li>&nbsp;&nbsp;<code>"March"</code>,</li>
            <li>&nbsp;&nbsp;<code>"April"</code>,</li>
            <li>&nbsp;&nbsp;<code>"May"</code>,</li>
            <li>&nbsp;&nbsp;<code>"June"</code>,</li>
            <li>&nbsp;&nbsp;<code>"July"</code>,</li>
            <li>&nbsp;&nbsp;<code>"August"</code>,</li>
            <li>&nbsp;&nbsp;<code>"September"</code>,</li>
            <li>&nbsp;&nbsp;<code>"October"</code>,</li>
            <li>&nbsp;&nbsp;<code>"November"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Decemeber"</code></li>
          </ul>]
        </td>
      </tr>
      <tr>
        <td valign="top">presetLabels</td>
        <td valign="top"><code>array</code></td>
        <td valign="top">An array of strings of the default preset labels.</td>
        <td valign="top">
          [&nbsp;&nbsp;
          <ul class="clean">
            <li>&nbsp;&nbsp;<code>"Today"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Last 7 Days"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Last 30 Days"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Last 60 Days"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Last 90 Days"</code>,</li>
            <li>&nbsp;&nbsp;<code>"Last Year"</code></li>
          </ul>]
        </td>
      </tr>
      <tr>
        <td valign="top">presetRanges</td>
        <td valign="top"><code>array</code></td>
        <td valign="top">An array of objects containing preset configurations.</td>
        <td valign="top">
          [&lbrace;&nbsp;&nbsp;
          <ul class="clean">
            <li>&nbsp;&nbsp;<code>"label": "string"</code>,</li>
            <li>&nbsp;&nbsp;<code>"start": "Date"</code>,</li>
            <li>&nbsp;&nbsp;<code>"end": "Date"</code></li>
          </ul>&rbrace;]
        </td>
      </tr>
      <tr>
        <td>includeFont</td>
        <td><code>boolean</code></td>
        <td>If false, the default font "Rubik" will not be loaded.</td>
        <td><code>true</code></td>
      </tr>
    </table>
  </section>

  <br>

  <section>
    <h2>Events</h2>

    <table class="table">
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Default</th>
      </tr>
      <tr>
        <td>onDayClick</td>
        <td><code>function</code></td>
        <td>Callback function to handle day click events.</td>
        <td><code>None</code></td>
      </tr>
      <tr>
        <td>onNavigationChange</td>
        <td><code>function</code></td>
        <td>Callback function to handle the navigation click event for months and years.</td>
        <td><code>None</code></td>
      </tr>
    </table>
  </section>

  <br>

  <section>
    <h2>Examples</h2>
    <p>Below are different examples of how you can configure the datepicker.</p>

    <h3>Single Date</h3>

    <div class="example">
      <SinglePicker />
    </div>

    <h3>Date Range</h3>

    <div class="example">
      <RangePicker />
    </div>

    <h3>Multipane Range</h3>

    <div class="example">
      <RangePicker isMultipane />
    </div>

    <h3>Preset Ranges</h3>

    <div class="example">
      <RangePicker showPresets days={6} />
    </div>

    <h3>Time Picker</h3>

    <div class="example">
      <SinglePicker showTimePicker />
    </div>

    <h3>Disable Past dates</h3>

    <div class="example">
      <SinglePicker enablePastDates={false} />
    </div>

    <h3>Enable Future dates</h3>

    <div class="example">
      <SinglePicker enableFutureDates />
    </div>

    <h3>Disabled Dates</h3>

    <div class="example">
      <SinglePicker enableFutureDates disabledDates={['11/25/23:11/29/23', '12/10/23', '12/14/23:12/31/23', '1/7/24:1/14/24']} />
    </div>

    <h3>Enabled Dates</h3>

    <div class="example">
      <SinglePicker enableFutureDates enabledDates={['1/14/23:3/16/24']} />
    </div>

    <h3>Theme</h3>

    <div class="example">
      <ThemePicker theme="custom-datepicker" />
    </div>
  </section>
</main>

<style>
	main {
		padding: 48px;
	}

  h1 {
    display: inline-block;
		margin: 0;
		padding: 0;
  }

	hr {
		border: 0;
		border-bottom: 1px solid #ddd;
		height: 1px;
	}

  code {
		background-color: #f0f0f0;
		border-radius: 3px;
		padding: 4px;
	}

  section {
    margin: 24px 0;
  }

  section h1 {
    display: inline-block;
	}

  .showcase {
    display: table-caption;
    height: 350px;
    margin: 48px 0;
    position: relative;
  }

	.example {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 16px 16px 10px;
		margin-bottom: 40px;
	}

  :global(.example > pre) {
    margin-top: 16px !important;
  }

  ul.clean {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    max-width: 1084px;
    width: 100%;
  }

  table tr th,
  table tr td {
    padding: 16px 24px;
    text-align: left;
  }

  table tr td:first-child {
    font-weight: 600;
  }


  table tr td small {
    color: #5d656f;
  }

  table tr td code {
    font-size: 12px;
  }

  table tr th {
    background-color: #fafafa;
    border-bottom: 1px solid #e8e9ea;
    color: #21333d;
    font-size: 14px;
    font-weight: 600;
  }

  table tr td {
    border-bottom: 1px solid #eceff1;
    color: #454f5a;
    font-size: 14px;
  }

  @media only screen and (max-width: 800px) {
    .showcase {
      height: 660px;
      margin: 48px auto;
    }
  }
</style>
