# Validation and Formatter for Malaysian NRIC

Malaysian NRIC (Kad Pengenalan) validation and formatter library

# Installation

`yarn add my-nric` or `npm i my-nric`

# Usage

```
import { nric } from 'my-nric';

const { data, error, isValid } = nric('950721-12-1234');
const { data, error, isValid } = nric('950721121234');
```

### Config Option

**option.includeDash (defaults to false)**

Returns a formatted IC Number with dash separator

```
const result = nric('950721-12-1234', { includeDash: true, });

{
  error: null,
  data: {
    formatted: '950721-12-1234',
    dateOfBirth: 1995-07-20T16:00:00.000Z,
    gender: 'Female',
    placeOfBirth: 'Sabah',
    currentAge: 27
  },
  isValid: true
},
```

```
const result = nric('950721-12-1234', { includeDash: false, });

{
  error: null,
  data: {
    formatted: '950721121234',
    dateOfBirth: 1995-07-20T16:00:00.000Z,
    gender: 'Female',
    placeOfBirth: 'Sabah',
    currentAge: 27
  },
  isValid: true
},
```

**option.partialAge (defaults to false)**

Returns a floating point number of the age

```
const result = nric('950721-12-1234',{
  includeDash: true,
  partialAge: true,
});

{
  error: null,
  data: {
    formatted: '950721-12-1234',
    dateOfBirth: 1995-07-20T16:00:00.000Z,
    gender: 'Female',
    placeOfBirth: 'Sabah',
    currentAge: 27.618831219308035
  },
  isValid: true
},
```

```
const result = nric('950721-12-1234',{
  includeDash: true,
  partialAge: false,
});

{
  error: null,
  data: {
    formatted: '950721-12-1234',
    dateOfBirth: 1995-07-20T16:00:00.000Z,
    gender: 'Female',
    placeOfBirth: 'Sabah',
    currentAge: 27
  },
  isValid: true
},
```

# Error Example

**Invalid Birth Date**

```
const result = nric('959921-12-1234');

// Output:
{ error: 'Invalid Birth Date', data: {}, isValid: false },
```

**Invalid Place Of Birth Code**

```
const result = nric('950821-99-1234');

// Output:
{
  error: 'Invalid Place Of Birth Code',
  data: {},
  isValid: false
}
```

# Data Object

When a given NRIC number passes the validation, it returns the object below in the `data` property

- `formatted` (String): A formatted nric based on given option
- `dateOfBirth` (Date): Date of birth
- `placeOfBirth` (String): Place of Birth
- `currentAge` (Number): Current age
- `gender` (String): Gender `'Male' | 'Female'`

# NRIC Object

Returns an object that contains these properties:

- `isValid (boolean)` Whether the NRIC is valid
- `error (string | null)` The error object when NRIC is invalid
- `data (Data | {})` The extractable information based on the NRIC.

```
  isValid: boolean;
  error: string | null;
  data: Data | {};
```

# Test Suite

```
 PASS  src/test/index.test.ts (170 MB heap size)
  General Format
    ✓ Accept 14 Characters (4 ms)
    ✓ Accept 12 Characters (1 ms)
    ✓ Throws Error When 14 Characters of Alphabets (1 ms)
    ✓ Throws Error When 14 Characters of Symbols (1 ms)
    ✓ Throws Error When 12 Characters of Alphabets (2 ms)
    ✓ Throws Error When 12 Characters of Symbols
  Validate Date Of Birth Format
    ✓ On Dash Format, Returns Error When Month Is Invalid (10 ms)
    ✓ On Non-Dash Format, Returns Error When Month Is Invalid (9 ms)
    ✓ On Dash Format, Returns Error When Day Is Invalid (64 ms)
    ✓ On Non-Dash Format, Returns Error When Day Is Invalid (13 ms)
  Validate Place Of Birth Format
    ✓ On Dash Format, Throw Errors When Place Of Birth Code Is Invalid (1 ms)
    ✓ On Non-Dash Format, Throw Errors When Place Of Birth Code Is Invalid
    ✓ On Dash Format, Returns Correct Place Of Birth (17 ms)
    ✓ On Non-Dash Format, Returns Correct Place Of Birth (15 ms)
  Returns Correct Gender
    ✓ On Dash Format, Returns Correct Gender (4 ms)
    ✓ On Non-Dash Format, Returns Correct Gender (4 ms)

Test Suites: 1 passed, 1 total
Tests:       16 passed, 16 total
Snapshots:   0 total
Time:        0.943 s, estimated 1 s
Ran all test suites.
✨  Done in 1.57s.
```
