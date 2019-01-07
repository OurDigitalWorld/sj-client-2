import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'ul',
  classNames: ['pagination', 'search-pagination', 'pt-3'],
  //boolean for determining if currently on first page
  isFirstPage: computed('meta.page', function(){ return parseInt(this.meta.page) === 1 }),
  previousPage: computed('meta.page', function(){ return parseInt(this.meta.page) - 1}),
  nextPage: computed('meta.page', function(){ return parseInt(this.meta.page) + 1}),
  //the number of pages that have content
  totalPages: computed('meta.{result_count,per_page}', function(){ return Math.ceil(parseFloat(this.meta.result_count)/parseFloat(this.meta.per_page))}),
  //boolean for determining if currently on last page
  isLastPage: computed('meta.page', 'totalPages', function(){ return parseInt(this.meta.page) === parseInt(this.totalPages) }),
  //for displaying an ellipse based on the current page and number of total pages
  displayEllipse: computed('meta.page','lastPage', function(){ return parseInt(this.meta.page) > 6 && parseInt(this.totalPages) > 11}),
  //object containing all pagination links to be displayed aside from first page and prev/next page links
  paginationLinks: computed('meta.page', 'lastPage', function(){
    const currentPage = parseInt(this.meta.page);
    const totalPages = parseInt(this.totalPages);
    const getPages = (current, init, max) => {
      let output = [];
      for (let i=init; i<=max; i++){
        let link = {};
        if (i === current){link.isActive = true;}
        link.page = i;
        output.push(link);
      }
      return output;
    };
    //if there are 11 or fewer pages, return pages 2 to last
    if (totalPages < 10){return getPages(currentPage, 2, totalPages);}
    //else if currently on pages 1-6, get pages 2-9
    else if (currentPage < 7){return getPages(currentPage, 2, 9)}
    //else if the current page is within 7 of the last page
    else if (currentPage > (totalPages-6)){return getPages(currentPage, totalPages-8, totalPages)}
    //otherwise, just get the 3 pages on either side of the current page
    else {return getPages(currentPage, currentPage-3, currentPage+3)}
  })
});
