import NumberFilterField from './NumberFilterField';
import TestUtil from '../../../Util/TestUtil';

describe('NumberFilterField', () => {

  let wrapper: any;
  const dummyFn = jest.fn();
  beforeEach(() => {
    const dummyData = TestUtil.getDummyGsData();
    wrapper = TestUtil.shallowRenderComponent(NumberFilterField, {
      internalDataDef: dummyData,
      onValueChange: dummyFn,
      selectedAttribute: 'foo',
      validateStatus: 'success'
    });
  });

  afterEach(() => {
    dummyFn.mockReset();
  });

  it('is defined', () => {
    expect(NumberFilterField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('#onChange', () => {
    it('is defined', () => {
      expect(wrapper.instance().onChange).toBeDefined();
    });

    it('calls onValueChange of props', () => {
      const value = 1909.09;
      wrapper.instance().onChange(value);
      expect(dummyFn.mock.calls).toHaveLength(1);
    });
  });

});
