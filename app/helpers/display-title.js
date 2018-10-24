/* display-title helper
Use in template: {{display-title model.title lang=hl}}
Will return model.title in language designated to lang, will default to english otherwise
 */

import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  //injects current locale from service
  intl: service(),
  compute(params){
    const [title] = params;
    const defaultLang = title.eng ? 'eng' : 'fre';
    //mapping languages between BCP47 language tags used by intl service and simple three letter codes found in server data
    const langMap = {
      "en-us": "eng",
      "fr-fr": "fre"
    };
    const lang = this.intl.get('locale') === undefined ? defaultLang : langMap[this.intl.get('locale')];
    const displayTitle = title[lang] ? title[lang] : title[defaultLang];
    return displayTitle.replace(/--$/,'').trim(); //clean up a little bit before outputting
  }
});
