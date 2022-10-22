import {expect} from 'chai';
// import sinon from 'sinon';
// import {marbles} from 'rxjs-marbles/mocha';

import debug from './debug';

describe('debug', () => {
  it('should export a function', () => {
    expect(debug).to.be.a('function');
    expect(debug()).to.be.a('function');
  });
});
