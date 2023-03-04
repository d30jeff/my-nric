export type ConfigOptions = {
  includeDash?: boolean;
  partialAge?: boolean;
};

export type Data = {
  formatted: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  currentAge: string;
  gender: 'Male' | 'Female';
};

export type NRIC = {
  isValid: boolean;
  error: string | null;
  data: Data | {};
};
