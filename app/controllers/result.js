import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,
  isSerial: computed('model.category', function(){
    return this.model.category.includes('Serial');
  }),
  //tells RouterScroll to return to the previous scroll position
  actions: {
    back(){
      history.back();
    }
  }
});
