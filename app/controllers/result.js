import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { compare } from '@ember/utils';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,
  isSerial: computed('model.category', function(){
    return this.model.category.includes('Serial');
  }),
  sortedIssuesEng: computed.sort('issues.eng', function(a,b){
    return compare(parseInt(a.serial_order), parseInt(b.serial_order));
  }),
  sortedIssuesFre: computed.sort('issues.fre', function(a,b){
    return compare(parseInt(a.serial_order), parseInt(b.serial_order));
  }),
  actions: {
    back(){
      history.back();
    }
  }
});
