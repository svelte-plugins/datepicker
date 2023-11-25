import { render } from '@testing-library/svelte';
import DatePicker from './datepicker.svelte';

const today = new Date('1/1/2020');

const config = {
  startDate: today,
  endDate: today,
  startDateTime: '00:00',
  endDateTime: '00:00',
  today,
  defaultYear: today.getFullYear(),
  defaultMonth: today.getMonth(),
  startOfWeek: 0,
  isMultipane: false,
  isRange: false,
  isOpen: false,
  align: 'left',
  theme: '',
  disabledDates: [],
  onDayClick: () => {},
  showYearControls: true,
  showPresets: false,
  showTimePicker: false,
  enableFutureDates: false,
  enablePastDates: true,
  presetLabels: ['Today', 'Last 7 Days', 'Last 30 Days', 'Last 60 Days', 'Last 90 Days', 'Last Year'],
  dowLabels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthLabels: [
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
  ]
};

describe('Components: DatePicker', () => {
  let TestHarness;

  beforeEach(() => {
    TestHarness = (props = {}) => render(DatePicker, props);
  });

  it('should render the component', () => {
    const { container } = TestHarness();
    expect(container).toMatchSnapshot();
  });
});
