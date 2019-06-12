import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { set } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return this.store.findRecord('record', params.result_id, {backgroundReload: true});
  },
  //takes the source_record_id from the result record, and loads issues based on it.
  afterModel(model, transition){
    const serial_set = transition.queryParams.page ? transition.queryParams.page : 1;
    const category = 'Issue';
    const per_page = 100; //this must be set the same as the field in the parser, so that a serial_set contains exactly this many record
    const _this = this;
    const parent_id = model.get('source_record_id');
    const api_key = ENV.APP.api_key;
    //query params for returning just metadata
    const metaquery = {
      and:{parent_id, category},
      without:{serial_set: "null"},
      fields:'none',
      per_page:0,
      api_key,
    };
    //sends a request for issues with no data in response to fetch metadata for pagination purposes
    this.store.query('record', metaquery).then((data) => {
      const page = serial_set;
      const result_count = data.meta.result_count;
      set(this.controllerFor('result'), 'meta', {page, result_count, per_page});
    });
    //create a hash of promises for fetching data based on language content
    const issuesHash = {};
    model.get('attachments').forEach(function(attachment){
      issuesHash[attachment.lang] = _this.store.query('record', {
        and: {parent_id:attachment.id, category, serial_set},
        fields: 'all',
        per_page,
        api_key
      });
    });
    //resolve all the promises and assign them to the controller
    return RSVP.hash(issuesHash).then(function(hash){
      set(_this.controllerFor('result'), 'issues', hash);
    })
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
