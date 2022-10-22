import {tap} from 'rxjs/operators';

const debug = () => source$ => source$.pipe(
  tap(() => {
    if (process.env === 'development') debugger;
  })
);

export default debug;

