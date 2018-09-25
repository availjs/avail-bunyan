'use strict'

import test from 'ava';
import Logger from 'bunyan';
import WithBunyan from '../src/WithBunyan';

test.beforeEach(t => {
  const Avail = WithBunyan();
  const name = 'test';
  const avail = new Avail(name);
  t.context = {
    name,
    avail
  };
});

test('WithBunyan() should return an Avail constructor that includes an instance of a bunyan logger', t => {
  t.true(t.context.avail.log instanceof Logger);
  t.is(t.context.name, t.context.avail.name)
});
