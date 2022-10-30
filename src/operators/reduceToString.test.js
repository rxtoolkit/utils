import {expect} from 'chai';
// import sinon from 'sinon';
import {marbles} from 'rxjs-marbles/mocha';
import {takeLast} from 'rxjs/operators';

import reduceToString from './reduceToString';

describe('reduceToString', () => {
  it('should export a function', () => {
    expect(reduceToString).to.be.a('function');
  });

  it('should concatenate strings when given valid input', marbles(m => {
    const strings = [
      'of ',
      'all ',
      'the ',
      'bars ',
      'in ',
      'all ',
      'the ',
      'world...',
    ];
    const input$ = m.cold('0123456(7|)', strings);
    const actual$ = input$.pipe(
      reduceToString(),
      takeLast(1)
    );
    const expected$ = m.cold('-------(0|)', [
      'of all the bars in all the world...'
    ]);
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should throw if non-string input is given', marbles(m => {
    const strings = [
      'of ',
      'all ',
      'the ',
      null,
    ];
    const input$ = m.cold('012(3|)', strings);
    const actual$ = input$.pipe(reduceToString());
    const expected$ = m.cold(
      '012#',
      ['of ', 'of all ', 'of all the '],
      new Error('input to reduceToString must be a string')
    );
    m.expect(actual$).toBeObservable(expected$);
  }));
});
