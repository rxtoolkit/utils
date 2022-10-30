import chai from 'chai';
const {expect} = chai;
// import sinon from 'sinon';
import {marbles} from 'rxjs-marbles/mocha';

import listToSingleResult from './listToSingleResult';

describe('listToSingleResult', () => {
  it('should export a function', () => {
    expect(listToSingleResult).to.be.a('function');
    expect(listToSingleResult()).to.be.a('function');
  });

  it('should condense list to a single result', marbles(m => {
    const doc = {_id: 'foo'};
    const in$ = m.cold('--0|', [[doc]]);
    const out$ = in$.pipe(listToSingleResult(doc._id));
    const expected$ = m.cold('--0|', [doc]);
    m.expect(out$).toBeObservable(expected$);
  }));

  it('should return error observable if list are empty', marbles(m => {
    const doc = {_id: 'foo'};
    const in$ = m.cold('--0|', [[]]);
    const out$ = in$.pipe(listToSingleResult(doc._id));
    const errMessage = `expected array with length > 0 but got 0`;
    const expected$ = m.cold('--#', null, new Error(errMessage));
    m.expect(out$).toBeObservable(expected$);
  }));
});
