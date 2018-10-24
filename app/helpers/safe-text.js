/*safe-text helper
returns text it is provided. If it is provided no text, it returns a placeholder string
Usage in template:  {{safe-text model.description}}
 */

import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  intl: service(),
  compute(param){
    return param[0] ? param[0] : this.get('intl').t('empty');
  }
});

