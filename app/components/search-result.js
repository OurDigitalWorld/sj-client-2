import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'article',
  classNames: ['search-result', 'media'],
  isIssue: computed('record.category', function(){
    return this.record.category.includes("Issue");
  }),
  linkAddress: computed('isIssue', 'record.{id,parent_sj_id}', function(){
    if (this.isIssue){
      return this.record.parent_sj_id;
    } else {
      return this.record.id;
    }
  })
});
