import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  isEmpty: computed('data', function(){
    return this.data ? this.data.length === 0 : true;
  }),
}).reopenClass({
  positionalParams: ['data']
});
