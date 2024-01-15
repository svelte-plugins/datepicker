import { render } from '@testing-library/svelte';
import DatePicker from './datepicker.svelte';

const today = new Date('1/1/2020');

const config = {
  startDate: today,
  endDate: today,
  startDateTime: '00:00',
  endDateTime: '00:00',
  startOfWeek: 0,
  isMultipane: false,
  isRange: false,
  isOpen: false,
  align: 'left',
  theme: '',
  disabledDates: [],
  enabledDates: [],
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

vi.setSystemTime(today);

describe('Components: DatePicker', () => {
  let TestHarness;

  beforeEach(() => {
    TestHarness = (props = {}) => render(DatePicker, props);
  });

  it('should render a single datepicker', () => {
    const { container } = TestHarness(config);
    expect(container).toMatchSnapshot();
  });

  it('should render a range picker', () => {
    const { container } = TestHarness({ ...config, isRange: true, isMultipane: true });
    expect(container).toMatchSnapshot();
  });

  it('should render a date picker with time selection', () => {
    const { container } = TestHarness({ ...config, showTimePicker: true });
    expect(container).toMatchSnapshot();
  });

  it('should render a range picker with presets', () => {
    const { container } = TestHarness({ ...config, isRange: true, showPresets: true });
    expect(container).toMatchSnapshot();
  });

  it('should render a date picker without year controls', () => {
    const { container } = TestHarness({ ...config, showYearControls: false });
    expect(container).toMatchSnapshot();
  });

  it('should render a date picker with Monday as start of week', () => {
    const { container } = TestHarness({ ...config, startOfWeek: 1 });
    expect(container).toMatchSnapshot();
  });

  it('should render a date picker with my custom locale', () => {
    const { container } = TestHarness({
      ...config,
      dowLabels: ['Au', 'Bo', 'Cu', 'De', 'Eh', 'Fr', 'Ga'],
      monthLabels: [
        'Qanuary',
        'Webruary',
        'Earch',
        'Rpril',
        'Tay',
        'Yune',
        'Uuly',
        'Iugust',
        'Oeptember',
        'Pctober',
        'Aovember',
        'Secember'
      ]
    });

    expect(container).toMatchSnapshot();
  });
});
