import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  subject: DS.attr(),
  display_content_partner: DS.attr(),
  display_date: DS.attr(),
  creator: DS.attr(),
  category: DS.attr(),
  publisher: DS.attr(),
  thumb_url: DS.attr(),
  attachments: DS.attr(),
  source_record_id: DS.attr(),
  parent_sj_id: DS.attr(),
  serial_set: DS.attr(),
  serial_order: DS.attr()
});
