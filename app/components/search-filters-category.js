import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  //default length to show by category --- will default to default if category isn't listed
  displayLengths: computed(function(){return{
    default: 10,
    display_content_partner: 5,
  };}),
  showAll: false,
  //subset of data based on display length
  truncatedData: computed('displayLengths', 'showAll', 'facet', 'data', function(){
    let i = 1;
    let obj = {};
    const displayLength = this.showAll? 100 : this.displayLengths[this.facet] ? this.displayLengths[this.facet] : this.displayLengths.default;
    for (const key in this.data){
      if (this.data.hasOwnProperty(key)){
        obj[key] = this.data[key];
        i++;
        if(i > displayLength){break;}
      }
    }
    return obj;
  }),
  actions:{
    toggleShowAll() {
      this.toggleProperty('showAll');
    }
  }
}).reopenClass({
  positionalParams: ['facet', 'data']
});
