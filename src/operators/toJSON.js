import {of,throwError} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

const toJSON = () => source$ => source$.pipe(
  mergeMap(data => {
    try {
      const json = JSON.stringify(data);
      return of(json);
    } catch (e) {
      return throwError(e);
    }
  })
);

export default toJSON;
