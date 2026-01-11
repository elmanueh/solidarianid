import { validatePageNumber } from '@app/admin/utils/pdf-util';

describe('validatePageNumber', () => {
  it('should return 1 when page is undefined', () => {
    expect(validatePageNumber(undefined)).toBe(1);
  });

  it('should return the correct page number when a valid positive integer string is provided', () => {
    expect(validatePageNumber('3')).toBe(3);
    expect(validatePageNumber('10')).toBe(10);
  });

  it('should return -1 when a non-numeric string is provided', () => {
    expect(validatePageNumber('abc')).toBe(-1);
    expect(validatePageNumber('!@#')).toBe(-1);
  });

  it('should return -1 when a negative number string is provided', () => {
    expect(validatePageNumber('-5')).toBe(-1);
    expect(validatePageNumber('-1')).toBe(-1);
  });

  it('should return -1 when zero is provided as a string', () => {
    expect(validatePageNumber('0')).toBe(-1);
  });
});
