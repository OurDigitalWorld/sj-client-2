/*get-object helper
Returns an object where the first param is the property, and the second param is the property value.
Use in template: {{#link-to "search" (query-params and=(get-obj "subject" "Energy")}}
Example would return: {'subject': ['Energy']}
 */

import { helper } from '@ember/component/helper';

export function getObj(params/*, hash*/) {
  const [filter, field] = params;
  let output = {};
  output[filter] = Array.of(field);
  return output;
}

export default helper(getObj);
