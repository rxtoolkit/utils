import {expect} from 'chai';
// import sinon from 'sinon';
import {marbles} from 'rxjs-marbles/mocha';

import toJSON from './toJSON';

describe('toJSON', () => {
  it('should export a function', () => {
    expect(toJSON).to.be.a('function');
    expect(toJSON()).to.be.a('function');
  });

  it('should return stream of stringified JSON objects', marbles(m => {
    const input$ = m.cold('--0-(1|)', [
      {foo: 'bar'},
      {banana: 'stand'},
    ]);
    const actual$ = input$.pipe(toJSON());
    const expected$ = m.cold('--0-(1|)', [
      '{"foo":"bar"}',
      '{"banana":"stand"}'
    ]);
    m.expect(actual$).toBeObservable(expected$);
  }));

  it('should throw an error if object cannot be stringified', marbles(m => {
    const input$ = m.cold('--0-(1|)', [
      {foo: 'bar'},
      'banana stand',
    ]);
    try {
      JSON.stringify('banana stand');
    } catch (err) {
      const actual$ = input$.pipe(toJSON());
      const expected$ = m.cold('--0-#', ['{/"foo/":"bar"}'], err);
      m.expect(actual$).toBeObservable(expected$);
    }
  }));
});
