import { ConfigOptions, NRIC } from './interface/index.interface';
import { dayjs } from './utils/dayjs.util';
import { stateCodes } from './utils/state-codes.util';

const PATTERN = /^[0-9]{6}[-]*[0-9]{2}[-]*[0-9]{4}$/i;
export const nric = (
  value: string,
  option: ConfigOptions = {
    includeDash: false,
    partialAge: false,
  }
): NRIC => {
  const { includeDash, partialAge } = option;

  const isValidFormat = value.match(new RegExp(PATTERN));

  if (!isValidFormat) {
    return {
      error: 'Invalid Format',
      data: {},
      isValid: false,
    };
  }

  const [data] = [...isValidFormat];
  const nric = data.replaceAll('-', '');
  const lastNRICDigit = nric[nric.length - 1];
  const partialBirthDate = nric.substring(0, 6);

  const birthDate = dayjs(partialBirthDate, 'YYMMDD', true);

  const isValidBirthDate = birthDate.isValid();

  if (!isValidBirthDate) {
    return {
      error: 'Invalid Birth Date',
      data: {},
      isValid: false,
    };
  }

  const stateCode = nric.substring(6, 8);
  const serialNumber = nric.substring(8, 12);

  const state = stateCodes[stateCode];

  if (!state) {
    return {
      error: 'Invalid Place Of Birth Code',
      data: {},
      isValid: false,
    };
  }

  let formattedNRIC = nric;

  if (includeDash) {
    formattedNRIC = [partialBirthDate, stateCode, serialNumber].join('-');
  }

  let dateOfBirth = dayjs(birthDate).subtract(dayjs(birthDate).isAfter(dayjs()) ? 100 : 0, 'year');

  if (dateOfBirth.isAfter(dayjs())) {
    dateOfBirth.subtract(100, 'year');
  }

  let currentAge = dayjs().diff(dateOfBirth, 'year', partialAge);

  return {
    error: null,
    data: {
      formatted: formattedNRIC,
      dateOfBirth: dateOfBirth.toDate(),
      gender: Number(lastNRICDigit) % 2 === 0 ? 'Female' : 'Male',
      placeOfBirth: state,
      currentAge,
    },
    isValid: true,
  };
};
