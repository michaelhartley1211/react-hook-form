import getFieldValue from '../../logic/getFieldValue';
import { Field } from '../../types';

jest.mock('../../logic/getRadioValue', () => ({
  default: () => ({
    value: 2,
  }),
}));

jest.mock('../../logic/getMultipleSelectValue', () => ({
  default: () => 3,
}));

jest.mock('../../logic/getCheckboxValue', () => ({
  default: () => ({
    value: 'testValue',
  }),
}));

describe('getFieldValue', () => {
  it('should return correct value when type is radio', () => {
    expect(
      getFieldValue({
        name: 'test',
        ref: {
          type: 'radio',
          name: 'test',
        },
      }),
    ).toBe(2);
  });

  it('should return the correct select value when type is select-multiple', () => {
    expect(
      getFieldValue({
        name: 'test',
        ref: {
          type: 'select-multiple',
          name: 'test',
          value: 'test',
        },
      }),
    ).toBe(3);
  });

  it('should return the correct value when type is checkbox', () => {
    expect(
      getFieldValue({
        name: 'test',
        ref: {
          name: 'test',
          type: 'checkbox',
        },
      }),
    ).toBe('testValue');
  });

  it('should return it value for other types', () => {
    expect(
      getFieldValue({
        name: 'test',
        ref: {
          type: 'text',
          name: 'bill',
          value: 'value',
        },
      }),
    ).toBe('value');
  });

  it('should return empty string when radio input value is not found', () => {
    expect(getFieldValue({ ref: {} } as Field['_f'])).toEqual(undefined);
  });

  it('should return files for input type file', () => {
    expect(
      getFieldValue({
        name: 'test',
        ref: {
          type: 'file',
          name: 'test',
          files: null,
        },
      }),
    ).toEqual(null);
  });

  it('should return undefined when input is not found', () => {
    expect(
      getFieldValue({
        name: 'test',
        ref: {
          name: 'file',
          files: null,
        },
      }),
    ).toEqual(undefined);
  });

  it('should not return value when the input is disabled', () => {
    expect(
      getFieldValue({
        name: 'test',
        ref: {
          name: 'radio',
          disabled: true,
          type: 'radio',
        },
      }),
    ).toEqual(undefined);
  });
});
