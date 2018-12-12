import { helper } from '@ember/component/helper';

export function parseUrl(params/*, hash*/) {
  //replaces any spaces in url with %20, to match what leglib expects.
  return params[0].replace(/\s/g, '%20');
}

export default helper(parseUrl);
