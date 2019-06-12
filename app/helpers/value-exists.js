import { helper } from '@ember/component/helper';

export function valueExists(params/*, hash*/) {
  const val = params[0] || undefined;
  if (typeof val === 'string'){
    return (val.trim().length > 0);
  } else if (typeof val === 'object' && Array.isArray(val) && val[0]){
    return (val[0].trim().length > 0);
  } else {
    return false;
  }
}

export default helper(valueExists);
