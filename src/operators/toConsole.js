import {tap} from 'rxjs/operators';

const toConsole = (label = null) => source$ => source$.pipe(
  tap(next => {
    if (process.env !== 'development') return;
    if (label) return console.log(label, next);
    console.log(next);
  })
);

export default toConsole;

