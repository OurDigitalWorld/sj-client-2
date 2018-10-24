import DS from 'ember-data';
import ENV from 'sj-client-2/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.APP.host,
  namespace: ENV.APP.namespace,
  urlForFindRecord(id, modelName){
    let baseUrl = this.buildURL();
    return `${baseUrl}/${modelName}s/${id}.json?api_key=${ENV.APP.api_key}&fields=${ENV.APP.resultFields}`;
  }
});
