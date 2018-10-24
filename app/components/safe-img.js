import Component from '@ember/component';

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'alt'],
  classNameBindings: ['isBroken:placeholder'],
  isBroken: false,
  didInsertElement: function(){
    this._super(...arguments);
    if (this.src === 'Unknown' || this.src === null){this.set('isBroken', true)}
    this.$().on('error', () => {
      this.set('isBroken', true);
    });
  },
  willDestroyElement: function(){
    this._super(...arguments);
    this.$().off();
  }
});
