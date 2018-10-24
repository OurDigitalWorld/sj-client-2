import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.JSONSerializer.extend({
  primaryKey: ENV.APP.primaryKey,
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    //deserialization for search results
    if (payload.hasOwnProperty('search')) {
      //grabs the metadata before normalizing it all away
      let meta = {};
      meta.result_count = payload.search.result_count;
      meta.per_page = payload.search.per_page;
      meta.page = payload.search.page;
      meta.facets = payload.search.facets;
      this.set('metaData', meta);
      payload.search.results.forEach(function(value, key){
        payload.search.results[key].title = value.title[0]; //sets title value to first object in array
      });
      return this._super(store, primaryModelClass, payload.search.results, id, requestType);
    }
    //deserialization for single page
    if (payload.hasOwnProperty('record')){
      payload.record.title = payload.record.title[0]; //sets title value to first object in array
      return this._super(store, primaryModelClass, payload.record, id, requestType);
    }
  },
  extractMeta(){
    return this.get('metaData');
  }
});
