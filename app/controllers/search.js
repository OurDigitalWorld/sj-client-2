import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  queryParams: ['page', 'text', 'per_page', 'fuzzySearch', 'and'],
  page: 1,
  text: '',
  and: computed(function(){return [];}), //sets param as array without data leak to @ember/object
  per_page: 20,
  perPage: 20,
  isLoading: false,
  searchBarParams: computed(function(){return{
    text: '',
    page: 1
  }}),
  fuzzySearch: true,
  //returns fuzzy version of string (all user-inputed ~s removed, and all words except 'and', 'or', and 'not' have ~ added to beginning
  getFuzzyText: computed('text', function(){
    return this.text ? this.text.split(" ").map(x => x.replace(/~/g, '')).map(x => (x.toLowerCase() !== 'and' && x.toLowerCase() !=='or' && x.toLowerCase() !== 'not') ? `~${x}` : x).join(" ") : '';
  }),
  //returns an exact version of string (all ~s removed)
  getExactText: computed('text', function(){
    return this.text.replace(/~/g, '');
  }),
  offsetOptions: computed(function(){return[
    {value: 10},
    {value: 20},
    {value: 50},
    {value: 100}
  ];}),
  //number of active filters
  activeFiltersCount: computed('and', function(){
    let i = 0;
    for(const property in this.and){
      if (this.and.hasOwnProperty(property)){
        i+= this.and[property].length;
      }
    }
    return i;
  }),
  //things that are being filtered that aren't normally displayed facets.
  additionalActiveFilters: computed('and', 'model.meta.facets', function(){
    const and = this.and;
    const facets = new Set(Object.keys(this.model.meta.facets));
    const filters = new Set(Object.keys(and));
    const uniqueFilters = new Set([...filters].filter(x => !facets.has(x)));
    let output = {};
    uniqueFilters.forEach(function(value){
      output[value] = and[value];
    });
    return output;
  }),
  //used to toggle visibility of search filters on mobile
  isVisible: false,
  actions: {
    //for updating a single param---accepts the param name and the param value
    updateParam(key, value){
      this.set(key, value);
    },
    //for updating multiple params simultaneously---accepts an object where the properties are params and the property values are the data to be updated
    updateParams(obj){
      if (this.get('isLoading') === false){
        for (const key in obj){
          if (!obj.hasOwnProperty(key)) {continue;}
          this.set(key, obj[key]);
          //if fuzzy search is enabled, update the search to use fuzzy text
          if (key === 'text' && this.fuzzySearch === true){
            this.set(key, this.getFuzzyText);
          }
          //needs this to deal with the fact that the route is not listening for changes within objects on query params
          if (key === 'and'){
            this.notifyPropertyChange(key);
          }
        }
      }
    },
    toggleVisible(){
      this.toggleProperty('isVisible');
    }
  }
});
