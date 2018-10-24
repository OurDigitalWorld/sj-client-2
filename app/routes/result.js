import Route from '@ember/routing/route';

export default Route.extend({
  model(params){
    return this.store.findRecord('record', params.result_id, {backgroundReload: true});
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
});
