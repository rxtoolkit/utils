import {scan} from 'rxjs/operators';

const withIndex = ({initialState = [null, -1]} = {}) => source$ => source$.pipe(
  scan((acc, next) => [next, acc[1] + 1], initialState)
);

export default withIndex;
