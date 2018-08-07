'use strict'

const Avail = require('@availjs/avail').Avail;
const bunyan = require('bunyan');

const DEFAULT_LOG_OPTIONS = {
  level: 'info',
  serializers: bunyan.stdSerializers
}

class AvailBunyan extends Avail {
  /**
   *
   * @param {String} name
   * @param {Array<Avail>} (dependencies)
   * @param {Function<Promise<*>>} (init)
   * @param {Object} (logOptions) - bunyan logger options
   */
  constructor(name, dependencies, init, logOptions={}) {
    super(name, dependencies, init);
    this.log = bunyan.createLogger(Object.assign(DEFAULT_LOG_OPTIONS, {
      name
    }, logOptions))
    this.on(Avail.EVENTS.ON_READY, () => this.log.info('ready'));
    this.on(Avail.EVENTS.ON_ERROR, err => this.log.error('error', { err }));
    this.on(Avail.EVENTS.ON_PRE_START, () => this.log.info('start'));
    this.on(Avail.EVENTS.ON_PRE_INIT, () => this.log.info('init'));
    this.on(Avail.EVENTS.ON_STOP, () => this.log.info('stop'));
  }
}

module.exports = AvailBunyan;