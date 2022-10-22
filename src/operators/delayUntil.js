import {isObservable,of,merge,throwError} from 'rxjs';
import {buffer,mergeMap,skipUntil,share,take} from 'rxjs/operators';

const errors = {
  triggerRequired: () => (
    new Error('delayUntil operator requires a trigger observable to be passed as its first parameter')
  )
};

// delays a stream from emitting until another stream has emitted
const delayUntil = start$ => source$ => {
  if (!isObservable(start$)) return throwError(errors.triggerRequired());
  const sourceSub$ = source$.pipe(share());
  const buffer$ = sourceSub$.pipe(
    buffer(start$),
    take(1),
    mergeMap(items => of(...items))
  );
  const stream$ = sourceSub$.pipe(
    skipUntil(start$)
  );
  const output$ = merge(buffer$, stream$);
  return output$;
};

export default delayUntil;
