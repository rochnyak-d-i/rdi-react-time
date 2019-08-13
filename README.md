# rdi-react-time

## Installation
```bash
npm i rdi-react-time
```

## Usage

```jsx
import Time from 'rdi-react-time';

const date = new Date();

// static
<Time date={date} format="YYYY-MM-DD HH:mm:ss" />

// dynamic
<Time autoUpdate intervalUpdate={1 * 1000} date={date} />
```

## Props

* className {string}
* date {string|Date}
* format {string}
* autoUpdate {boolean}
* timeUpdate {number}
* calendarUntilDays {number}

## Development

```bash
npm i && npm run build
```

### Tests
```bash
npm test
```
