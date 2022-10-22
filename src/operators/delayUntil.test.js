import {expect} from 'chai';
// import sinon from 'sinon';
import {marbles} from 'rxjs-marbles/mocha';

import delayUntil from './delayUntil';

describe('delayUntil', () => {
  it('should export a function', () => {
    expect(delayUntil).to.be.a('function');
    expect(delayUntil()).to.be.a('function');
  });

  it('should throw error if no trigger observable is provided', marbles(m => {
    const start$ = 'foobar';
    const input$ = m.cold('-01--2(3|)', [0, 1, 2, 3]);
    const actual$ = input$.pipe(delayUntil(start$));
    const expected$ = m.cold(
      '#',
      null,
      new Error('delayUntil operator requires a trigger observable to be passed as its first parameter')
    );
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should cause input observable to pause emissions until start trigger emits', marbles(m => {
    const inputData = [0, 1, 2, 3];
    const start$ = m.cold('-----0');
    const input$ = m.cold('-01--2----(3|)', inputData);
    const actual$ = input$.pipe(delayUntil(start$));
    const expected$ = m.cold('-----(012)(3|)', inputData);
    m.expect(actual$).toBeObservable(expected$);
    // m.expect(actual$).subscriptions();
  }));
});
