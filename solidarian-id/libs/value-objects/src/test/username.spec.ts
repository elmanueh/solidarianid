import { Username } from '../model/username';
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from '../constants/validation.constants';
import { InvalidUsernameError } from '@app/value-objects/errors/validation/username-validation-error';

describe('Username Value Object - Boundary Values', () => {
  it('should create a Username with exactly the minimum allowed length', () => {
    const minUsername = 'a'.repeat(USERNAME_MIN_LENGTH);
    const result = Username.create(minUsername);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.value).toBe(minUsername);
    }
  });

  it('should fail to create a Username with length less than minimum', () => {
    const tooShort = 'a'.repeat(USERNAME_MIN_LENGTH - 1);
    const result = Username.create(tooShort);
    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(InvalidUsernameError);
      expect(result.value.message).toMatch(/at least/);
    }
  });

  it('should create a Username with min length plus one character', () => {
    const minPlusOne = 'a'.repeat(USERNAME_MIN_LENGTH + 1);
    const result = Username.create(minPlusOne);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.value).toBe(minPlusOne);
    }
  });

  it('should create a Username with exactly the maximum allowed length', () => {
    const maxUsername = 'a'.repeat(USERNAME_MAX_LENGTH);
    const result = Username.create(maxUsername);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.value).toBe(maxUsername);
    }
  });

  it('should fail to create a Username with length greater than maximum', () => {
    const tooLong = 'a'.repeat(USERNAME_MAX_LENGTH + 1);
    const result = Username.create(tooLong);
    expect(result.isLeft()).toBe(true);
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(InvalidUsernameError);
      expect(result.value.message).toMatch(/not exceed/);
    }
  });

  it('should create a Username with max length minus one character', () => {
    const maxMinusOne = 'a'.repeat(USERNAME_MAX_LENGTH - 1);
    const result = Username.create(maxMinusOne);
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.value).toBe(maxMinusOne);
    }
  });
});
