import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | display-csv', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders, and returns <empty> when empty', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{display-csv}}`);

    assert.equal(this.element.textContent.trim(), '<empty>');
  });

  test('it returns an <ul> with class=csv when rendering with content', async function(assert) {
    this.set('string', 'hello world');

    await render(hbs`{{display-csv string}}`);

    assert.equal(this.element.querySelector('ul').getAttribute('class'), 'csv', 'works with strings');

    this.set('array', ['hi', 'hello']);

    await render(hbs`{{display-csv array}}`);

    assert.equal(this.element.querySelector('ul').getAttribute('class'), 'csv', 'works with arrays');
  });
});
