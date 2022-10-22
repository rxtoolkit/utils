import {expect} from 'chai';
// import sinon from 'sinon';
import {marbles} from 'rxjs-marbles/mocha';

import toConsole from './toConsole';

describe('toConsole', () => {
  it('should export a function', () => {
    expect(toConsole).to.be.a('function');
    expect(toConsole()).to.be.a('function');
  });

  it('should not alter input stream', marbles(m => {
    const input = [0, 1, 2, 3];
    const input$ = m.cold('-0-1(23|)', input);
    const actual$ = input$.pipe(toConsole());
    const expected$ = input$;
    m.expect(actual$).toBeObservable(expected$);
  }));
});
