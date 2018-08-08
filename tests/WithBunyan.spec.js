'use strict'

import { Writable } from 'stream';
import test from 'ava';
import sinon from 'sinon';
import Logger from 'bunyan';
import WithBunyan from '../src/WithBunyan';
import AddStandardLoggers from '../src/AddStandardLoggers';

class TestError extends Error {
  constructor() { super('test') }
}

function AsWritable(write) {
  return new Writable({
    write: (chunk, encoding, callback) => {
      const json = JSON.parse(chunk.toString());
      write(json.msg);
      callback();
    }
  });
}

function mockBunyan(info, error) {
  return {
    streams: [
      {
        stream: AsWritable(info),
        level: 'info'
      },
      {
        stream: AsWritable(error),
        level: 'error'
      }
    ]
  };
}

test.beforeEach(t => {
  const info = sinon.spy();
  const error = sinon.spy();
  const avail = init => WithBunyan(mockBunyan(info, error))(null, null, init);
  t.context = {
    info,
    error,
    avail
  };
});

test('WithBunyan() should return an Avail constructor that includes an instance of a bunyan logger', t => {
  t.true(t.context.avail().log instanceof Logger);
});
test('WithBunyan() should log an info and start event on start', async t => {
  const avail = t.context.avail();
  AddStandardLoggers(avail);
  await avail.start();
  t.true(t.context.info.called);
  // This relies heavily on the order of events being fired
  // if the number of events exceeds a threshold of 3, refactor this into something more maintainable
  t.is(t.context.info.args[0][0], 'start');
  t.is(t.context.info.args[1][0], 'init');
});
test.cb('WithBunyan() once all init functions have returned it should log when ready', t => {
  const avail = t.context.avail();
  AddStandardLoggers(avail);
  avail.on('ready', () => {
    t.is(t.context.info.args[2][0], 'ready');
    t.end();
  });
  avail.start();
  t.true(t.context.info.called);
});
test('WithBunyan() if an error occurs should log error event', async t => {
  t.plan(3);
  const avail = t.context.avail(async () => {throw new TestError()});
  AddStandardLoggers(avail);
  avail.on('error', () => {
    t.true(t.context.error.called);
    t.is(t.context.error.args[0][0], 'error');
  });
  await t.throws(avail.start());
});