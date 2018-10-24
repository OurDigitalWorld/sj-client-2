import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  intl: service(),
  queryParams: {
    hl: {replace: true, refreshModel: true}
  },
  actions: {
    queryParamsDidChange(param){
      if ('hl' in param){
        this.get('intl').setLocale(param.hl);
      }
    }
  }
});
