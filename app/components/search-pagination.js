import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'ul',
  classNames: ['pagination', 'search-pagination', 'pt-3'],
  //boolean for determining if currently on first page
  isFirstPage: computed('meta', function(){ return this.meta.page === 1 }),
  previousPage: computed('meta', function(){ return this.meta.page - 1}),
  nextPage: computed('meta', function(){ return this.meta.page + 1}),
  //the number of pages that have content
  totalPages: computed('meta', function(){ return Math.ceil(this.meta.result_count)/this.meta.per_page }),
  //boolean for determining if currently on last page
  isLastPage: computed('meta', 'totalPages', function(){ return this.meta.page === this.totalPages }),
  //for displaying an ellipse based on the current page and number of total pages
  displayEllipse: computed('meta','lastPage', function(){ return this.meta.page > 6 && this.totalPages > 11}),
  //object containing all pagination links to be displayed aside from first page and prev/next page links
  paginationLinks: computed('meta', 'lastPage', function(){
    const getPages = (context, init, max) => {
      let output = [];
      for (let i=init; i<=max; i++){
        let link = {};
        if (i === context.meta.page){link.isActive = true;}
        link.page = i;
        output.push(link);
      }
      return output;
    };
    //if there are 11 or fewer pages, return pages 2 to last
    if (this.totalPages < 10){return getPages(this, 2, this.totalPages);}
    //else if currently on pages 1-6, get pages 2-9
    else if (this.meta.page < 7){return getPages(this, 2, 9)}
    //else if the current page is within 7 of the last page
    else if (this.meta.page > (this.totalPages - 6)){return getPages(this, this.totalPages - 8, this.totalPages)}
    //otherwise, just get the 3 pages on either side of the current page
    else return getPages(this, this.meta.page - 3, this.meta.page + 3)
  })
});
