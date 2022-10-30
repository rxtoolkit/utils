import get from 'lodash/get';
import {of,throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

const defaultError = (index, len) => new Error(`expected array with length > ${index} but got ${len}`);

const mapListToItem = ({
  index = 0,
  throwIfUndefined = true,
  error = defaultError
} = {}) => (
  source$ => source$.pipe(
    mergeMap(docs =>
      docs && docs.length && docs.length >= index + 1
      ? of(docs[index])
      : (
        throwIfUndefined
        ? throwError(error(index, get(docs, 'length', 0)))
        : of(get(docs, `[${index}]`))
      )
    )
  )
);

export default mapListToItem;
