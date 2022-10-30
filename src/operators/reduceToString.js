import isString from 'lodash/isString';
import {of,throwError} from 'rxjs';
import {mergeMap,scan} from 'rxjs/operators';

const errors = {
  notAString: () => new Error('input to reduceToString must be a string'),
};

const reduceToString = (initialState = '') => source$ => source$.pipe(
  mergeMap(str => isString(str) ? of(str) : throwError(errors.notAString())),
  scan((acc, next) => `${acc}${next}`, initialState)
);

export default reduceToString;
