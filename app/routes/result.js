import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { set } from '@ember/object';

export default Route.extend({
  model(params){
    return this.store.findRecord('record', params.result_id, {backgroundReload: true});
  },
  //takes the source_record_id from the result record, and loads issues based on it.
  afterModel(model, transition){
    const page = transition.queryParams.page ? transition.queryParams.page : 1;
    const query = {
      and:{parent_id:model.get('source_record_id'), category:'Issue'},
      fields:'record_id,title,attachments,thumb_url',
      per_page:100,
      api_key:ENV.APP.api_key,
      page
    };
    return this.store.query('record', query).then((issues) => {
      set(this.controllerFor('result'), 'issues', issues);
    });
  },
  renderTemplate(){
    this.render(); //renders current template/model as usual
    this.render('result-back-button', { //also renders the search-bar template into the application
      into: 'application',
      outlet: 'search-bar'
    });
    this.render('result-thumbnail', {
      into: 'application',
      outlet: 'search-filters'
    });
  },
  queryParams: {
    page: {refreshModel: true, replace:true}
  }
});
