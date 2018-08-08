'use strict'

const Avail = require('@availjs/avail').Avail;

/**
 *
 * @param {Avail} avail
 * @returns {Avail}
 */
function AddStandardLoggers(avail) {
  avail.on(Avail.EVENTS.ON_READY, () => avail.log.info('ready'));
  avail.on(Avail.EVENTS.ON_ERROR, err => avail.log.error({ err }, 'error'));
  avail.on(Avail.EVENTS.ON_START, () => avail.log.info('start'));
  avail.on(Avail.EVENTS.ON_INIT, () => avail.log.info('init'));
  avail.on(Avail.EVENTS.ON_STOP, () => avail.log.info('stop'));
  return avail;
}

module.exports = AddStandardLoggers;