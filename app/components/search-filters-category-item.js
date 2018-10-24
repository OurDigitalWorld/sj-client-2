import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  intl: service(),
  tagName: 'li',
  classNames: ['search-filter-item'],
  //shows a placeholder value if the filter is empty.
  displayFilter: computed('filter', function(){
    return (this.filter.replace(/\s/g, '').length === 0) ? this.get('intl').t('empty') : this.filter;
  }),
  addItemParam: computed('facet', 'filter', 'and', function(){
    const facetSet = new Set(this.and[this.facet]).add(this.filter);
    const facetArray = Array.from(facetSet);
    return Object.assign({}, this.and, {[this.facet]:facetArray});
  }),
  removeItemParam: computed('facet', 'filter', 'and', function(){
    const facetSet = new Set(this.and[this.facet]);
    facetSet.delete(this.filter);
    const facetArray = Array.from(facetSet);
    let output = Object.assign({}, this.and, {[this.facet]:facetArray});
    Object.keys(output).forEach(function(key){
      if(output[key] === '' || output[key] === null || output[key].length === 0){
        delete output[key];
      }
    });
    return output;
  }),
  isActiveFilter: computed('facet', 'filter', 'and', function(){
    return (this.and[this.facet] ? this.and[this.facet].filter(value => value === this.filter).length > 0 : false)
  })
}).reopenClass({
  positionalParams: ['facet', 'filter', 'value']
});
