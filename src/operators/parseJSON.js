import {of,throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

const parseJSON = () => source$ => source$.pipe(
  mergeMap(data => {
    try {
      const json = JSON.parse(data);
      return of(json);
    } catch (e) {
      return throwError(e);
    }
  })
);

export default parseJSON;
