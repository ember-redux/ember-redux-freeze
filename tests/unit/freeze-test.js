import { module, test } from 'qunit';
import { freeze, deepFreeze } from 'ember-redux-freeze';

const dispatch = {};

module('unit: freeze test');

test('deepFreeze will blow up when object is modified', function(assert) {
  var a = Object.create(null);
  a.x = 1;
  deepFreeze(a);

  try {
    a.x = 2;
  } catch (e) {
    assert.ok(/^cannot assign to read only property/i.test(e.message));
    assert.equal(a.x, 1);
  }
});

test('deepFreeze will blow up when undefined property is set', function(assert) {
  var a = {
    b: function() {}
  };

  deepFreeze(a);

  try {
    a.x = 5;
  } catch (e) {
    assert.ok(/^Cannot add property x, object is not extensible/i.test(e.message));
    assert.equal(a.x, undefined);
  }
});

test('deepFreeze will blow up when deeply nested object is modified', function(assert) {
  var a = {
    b: {
      c: {
        d: {
          name: 'foo'
        }
      }
    }
  };

  deepFreeze(a);

  try {
    a.b.c.d.name = 'bar';
  } catch (e) {
    assert.ok(/^cannot assign to read only property/i.test(e.message));
    assert.equal(a.b.c.d.name, 'foo');
  }
});

test('should throw when mutation occurs during action dispatching', function(assert) {
  const state = {};
  const getState = () => state;
  const next = () => {
    const state = getState();
    state.prop = 0;
  }
  try {
    freeze({dispatch, getState})(next)();
  } catch (e) {
    assert.ok(/^Cannot add property prop, object is not extensible/i.test(e.message));
  }
});

test('should throw when mutation occurs outside action dispatching', function(assert) {
  const state = {};
  const getState = () => state;
  const next = () => {};

  freeze({dispatch, getState})(next)();

  try {
    const state = getState();
    state.prop = 0;
  } catch (e) {
    assert.ok(/^Cannot add property prop, object is not extensible/i.test(e.message));
  }
});

test('should not attempt to freeze non-object values', function(assert) {
  assert.expect(4);

  const nonObjectValues = [
    undefined,
    null,
    0,
    ''
  ];

  const next = () => {};

  nonObjectValues.forEach(state => {
    const getState = () => state;

    freeze({dispatch, getState})(next)();
    assert.ok(true);
  });
});

test('should throw when mutation occurs on an object with null prototype', function(assert) {
  const state = Object.create(null, {x: {}});
  const getState = () => state;
  const next = () => {};

  freeze({dispatch, getState})(next)();

  try {
    const state = getState();
    state.x.y = 0;
  } catch (e) {
    assert.ok(/^Cannot set property 'y' of undefined/i.test(e.message));
  }
});
