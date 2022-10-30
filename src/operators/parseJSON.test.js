import {expect} from 'chai';
// import sinon from 'sinon';
import {marbles} from 'rxjs-marbles/mocha';

import parseJSON from './parseJSON';

describe('parseJSON', () => {
  it('should export a function', () => {
    expect(parseJSON).to.be.a('function');
  });

  it('should throw error if ', marbles(m => {
    const inputs = [
      '{\"foo\":\"bar\"}',
      'notastring',
    ];
    const input$ = m.cold('--0-(1|)', inputs);
    const actual$ = input$.pipe(
      parseJSON()
    );
    let error = new Error('Unexpected token o in JSON at position 1');
    error.name = 'SyntaxError';
    const expected$ = m.cold(
      '--0-#',
      [{foo: 'bar'}],
      error
    );
    m.expect(actual$).toBeObservable(expected$);
  }));
});
