import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { compare } from '@ember/utils';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,
  isSerial: computed('model.category', function(){
    return this.model.category.includes('Serial');
  }),
  //returns a combined model containing the attachments from the english issues, followed by the french issues.
  issuesAll: computed('issues.{eng,fre}', function(){
    if (this.issues.eng && this.issues.fre) {
      let combinedIssues = [];
      //combines issues using attachment title as the primary key
      const engTitles = this.issues.eng.map(a => a.attachments[0].title);
      const freTitles = this.issues.fre.map(a => a.attachments[0].title);
      const allTitles = [...new Set([...engTitles, ...freTitles])];
      for (let title of allTitles){
        let engIssue = this.issues.eng ? this.issues.eng.find(a => {return a.attachments[0].title === title;}) : null;
        const freIssue = this.issues.fre ? this.issues.fre.find(a => {return a.attachments[0].title === title;}) : null;
        //where there's a match, adds the attachment from the french issue to the english model record.
        engIssue.attachments.push(freIssue.attachments[0]);
        combinedIssues.push(engIssue);
      }
      return combinedIssues;
    } else if (this.issues.eng){
      return this.issues.eng;
    } else if (this.issues.fre){
      return this.issues.fre;
    }
  }),
  sortedIssuesAll: computed.sort('issuesAll', function(a,b){
    return compare(parseInt(a.serial_order), parseInt(b.serial_order));
  }),
  actions: {
    back(){
      history.back();
    }
  }
});
