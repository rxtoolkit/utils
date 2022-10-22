# @buccaneerai/rxjs-utils
> 🔌 Re-usable operators and utilities for rxjs

## Installation
This is a private package. It requires setting up access in your npm config.

```bash
yarn add @buccaneerai/rxjs-utils
```

## API

### `delayUntil`
Delays emissions from a source observable until another observable emits.
```js
import {from,timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {delayUntil} from '@buccaneerai/rxjs-utils';

const string$ = from(['foo', 'bar']);
const start$ = timer(5000).pipe(tap(console.log));
const output$ = string$.pipe(delayUntil(start$));
output$.subscribe(console.log); 
// Output:
// 5000
// foo
// bar
```
