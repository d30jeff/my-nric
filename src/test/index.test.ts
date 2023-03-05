import { nric } from '..';
import { Data } from '../interface/index.interface';
import { stateCodes } from '../utils/state-codes.util';

describe('General Format', () => {
  test('Accept 14 Characters', () => {
    const { data, error, isValid } = nric('910721-12-1234');
    expect(isValid).toBe(true);
    expect(error).toBe(null);
    expect(data).toBeDefined();
  });

  test('Accept 12 Characters', () => {
    const { data, error, isValid } = nric('910721-12-1234');
    expect(isValid).toBe(true);
    expect(error).toBe(null);
    expect(data).toBeDefined();
  });

  test('Throws Error When 14 Characters of Alphabets', () => {
    const { data, error, isValid } = nric('ABCDEF-GH-HIJK');
    expect(isValid).toBe(false);
    expect(error).toBe('Invalid Format');
    expect(data).toEqual({});
  });

  test('Throws Error When 14 Characters of Symbols', () => {
    const { data, error, isValid } = nric('!@#$%^-&*-()_+');
    expect(isValid).toBe(false);
    expect(error).toBe('Invalid Format');
    expect(data).toEqual({});
  });

  test('Throws Error When 12 Characters of Alphabets', () => {
    const { data, error, isValid } = nric('ABCDEFGHHIJK');
    expect(isValid).toBe(false);
    expect(error).toBe('Invalid Format');
    expect(data).toEqual({});
  });

  test('Throws Error When 12 Characters of Symbols', () => {
    const { data, error, isValid } = nric('!@#$%^&*()_+');
    expect(isValid).toBe(false);
    expect(error).toBe('Invalid Format');
    expect(data).toEqual({});
  });
});

describe('Validate Date Of Birth Format', () => {
  test('On Dash Format, Returns Error When Month Is Invalid', () => {
    for (let i = 13; i <= 99; i++) {
      const value = String(i);
      const generatedIC = `90${value.padStart(2, value)}21-12-1234`;
      const { data, error, isValid } = nric(generatedIC);
      expect(isValid).toBe(false);
      expect(error).toBe('Invalid Birth Date');
      expect(data).toEqual({});
    }
  });

  test('On Non-Dash Format, Returns Error When Month Is Invalid', () => {
    for (let i = 13; i <= 99; i++) {
      const value = String(i);
      const generatedIC = `90${value.padStart(2, value)}21-12-1234`;
      const { data, error, isValid } = nric(generatedIC);
      expect(isValid).toBe(false);
      expect(error).toBe('Invalid Birth Date');
      expect(data).toEqual({});
    }
  });

  test('On Dash Format, Returns Error When Day Is Invalid', () => {
    for (let i = 32; i <= 99; i++) {
      const value = String(i);
      const generatedIC = `9001${value.padStart(2, value)}-12-1234`;
      const { data, error, isValid } = nric(generatedIC);
      expect(isValid).toBe(false);
      expect(error).toBe('Invalid Birth Date');
      expect(data).toEqual({});
    }
  });

  test('On Non-Dash Format, Returns Error When Day Is Invalid', () => {
    for (let i = 32; i <= 99; i++) {
      const value = String(i);
      const generatedIC = `9001${value.padStart(2, value)}121234`;
      const { data, error, isValid } = nric(generatedIC);
      expect(isValid).toBe(false);
      expect(error).toBe('Invalid Birth Date');
      expect(data).toEqual({});
    }
  });
});

describe('Validate Place Of Birth Format', () => {
  test(`On Dash Format, Throw Errors When Place Of Birth Code Is Invalid`, () => {
    const { data, error, isValid } = nric(`900721-17-1234`);
    expect(isValid).toBe(false);
    expect(error).toBe('Invalid Place Of Birth Code');
    expect(data).toEqual({});
  });

  test(`On Non-Dash Format, Throw Errors When Place Of Birth Code Is Invalid`, () => {
    const { data, error, isValid } = nric(`900721171234`);
    expect(isValid).toBe(false);
    expect(error).toBe('Invalid Place Of Birth Code');
    expect(data).toEqual({});
  });

  test(`On Dash Format, Returns Correct Place Of Birth`, () => {
    Object.entries(stateCodes).forEach(([code, value]) => {
      const { data, error, isValid } = nric(`900721-${code}-1234`);
      expect(isValid).toBe(true);
      expect(error).toBe(null);
      expect((data as Data).placeOfBirth).toBe(value);
    });
  });

  test(`On Non-Dash Format, Returns Correct Place Of Birth`, () => {
    Object.entries(stateCodes).forEach(([code, value]) => {
      const { data, error, isValid } = nric(`900721${code}1234`);
      expect(isValid).toBe(true);
      expect(error).toBe(null);
      expect((data as Data).placeOfBirth).toBe(value);
    });
  });
});

describe('Returns Correct Gender', () => {
  test('On Dash Format, Returns Correct Gender', () => {
    for (let i = 0; i <= 20; i++) {
      const value = String(i);
      const generatedIC = `900721-12-12${value.padStart(2, value)}`;
      const { data, error, isValid } = nric(generatedIC);
      const expectedGender = i % 2 === 0 ? 'Female' : 'Male';
      expect(isValid).toBe(true);
      expect(error).toBe(null);
      expect((data as Data).gender).toBe(expectedGender);
    }
  });

  test('On Non-Dash Format, Returns Correct Gender', () => {
    for (let i = 0; i <= 20; i++) {
      const value = String(i);
      const generatedIC = `900721-12-12${value.padStart(2, value)}`;
      const { data, error, isValid } = nric(generatedIC);
      const expectedGender = i % 2 === 0 ? 'Female' : 'Male';
      expect(isValid).toBe(true);
      expect(error).toBe(null);
      expect((data as Data).gender).toBe(expectedGender);
    }
  });
});
