### Validation and Formatter for Malaysian NRIC

### Installation

`yarn add my-nric` or `npm i my-nric`

### Usage

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

### Error Example

**Invalid Birth Date**

```
const result = nric('959921-12-1234');

// Output:
{ error: 'Invalid Birth Date', data: {}, isValid: false },
```

**Invalid State Code**

```
const result = nric('950821-99-1234');

// Output:
{
  error: 'Invalid State Code',
  data: {},
  isValid: false
}
```

### Data Object

Valid NRIC Numbers would have these following properties:

- `formatted`: A formatted;
  dateOfBirth: Date;
  placeOfBirth: string;
  currentAge: string;
  gender: 'Male' | 'Female';

### NRIC Object

Returns an object that contains these properties:

- `isValid (boolean)` Wether the NRIC Number is valid
- `error (string | null)`
- `data (Data | {})`

```
  isValid: boolean;
  error: string | null;
  data: Data | {};
```
