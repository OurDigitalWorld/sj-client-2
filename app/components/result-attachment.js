import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isSuppliment: computed('attachment', function(){
    return this.attachment.type === 'suppliment';
  })
}).reopenClass({
  positionalParams: ['attachment']
});
