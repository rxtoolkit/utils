# @buccaneerai/rxjs-utils
> 🔌 Re-usable operators and utilities for rxjs

## Installation
This is a private package. It requires setting up access in your npm config.

```bash
yarn add @buccaneerai/rxjs-utils
```

## API

## `debug`
Add a debugger to an RXJS pipeline.
```js
import {from} from 'rxjs';
import {map} from 'rxjs/operators';
import {debug,toConsole} from '@buccaneerai/rxjs-utils';

const input$ = from([2, 3]);
const output$ = input$.pipe(
  toConsole('input'),
  debug(), // inserts breakpoint here
  map(n => n * n),
  toConsole('squared'),
  debug() // inserts a second breakpoint here
);
output$.subscribe();
// 2
// debugger will pause here!
// squared 4
// debugger will pause here!
// 3
// debugger will pause here!
// squared 9
// debugger will pause here!
```

### `delayUntil`
Delays emissions from a source observable until another observable emits.
```js
import {from,timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import {delayUntil} from '@buccaneerai/rxjs-utils';

// this code delay emitting items from the source observable until 5 seconds 
// have passed
const string$ = from(['foo', 'bar']);
const start$ = timer(5000).pipe(tap(console.log));
const output$ = string$.pipe(delayUntil(start$));
output$.subscribe(console.log); 
// Output:
// 5000
// foo
// bar
```

## `toConsole`
Add a debugger to an RXJS pipeline.
```js
import {from} from 'rxjs';
import {toConsole} from '@buccaneerai/rxjs-utils';

const input$ = from([1, 2, 3]);
const output$ = input$.pipe(
  toConsole(),
  map(n => n * n),
  toConsole('squared')
);
output$.subscribe();
// 1
// squared 1
// 2
// squared 4
// 3
// squared 4
```

### `withIndex`
Add an index to data in the stream.
```js
import {from} from 'rxjs';
import {withIndex} from '@buccaneerai/rxjs-utils';

const input$ = from(['there\'s', 'no', 'place', 'like', 'home']);
const output$ = input$.pipe(
  withIndex()
);
output$.subscribe(console.log);
// ["there's", 0]
// ["no", 1]
// ["place", 2]
// ["like", 3]
// ["home", 4]
```
