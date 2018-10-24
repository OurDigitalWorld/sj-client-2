import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  hideRecords: computed(function() {return ['title','thumb_url','attachments']}),
  linkRecords: computed(function() {return ['subject','publisher']}),
  //tells RouterScroll to return to the previous scroll position
  actions: {
    back(){
      history.back();
    }
  }
});
