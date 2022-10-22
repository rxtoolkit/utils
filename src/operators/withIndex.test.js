import {expect} from 'chai';
// import sinon from 'sinon';
import {marbles} from 'rxjs-marbles/mocha';

import withIndex from './withIndex';

describe('withIndex', () => {
  it('should export a function', () => {
    expect(withIndex).to.be.a('function');
    expect(withIndex()).to.be.a('function');
  });

  it('should add an index to each item in the Observable', marbles(m => {
    const input = ['here\'s', 'looking', 'at', 'you', 'kid'];
    const input$ = m.cold('-0-123(4|)', input);
    const actual$ = input$.pipe(withIndex());
    const expected$ = m.cold('-0-123(4|)', input.map((str, i) => [str, i]));
    m.expect(actual$).toBeObservable(expected$);
  }));
});
