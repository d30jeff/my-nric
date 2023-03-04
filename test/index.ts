const { nric } = require('../src/index');

const results = [
  nric('959921-12-1234'),
  nric('950821-99-1234'),
  nric('200821-12-1235'),
  nric('560821-74-1236'),
  nric('230821-74-1236'),
];

console.info(results);
