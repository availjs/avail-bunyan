'use strict'

const Avail = require('@availjs/avail').Avail;
const bunyan = require('bunyan');

const DEFAULT_LOG_OPTIONS = {
  level: 'info',
  serializers: bunyan.stdSerializers
};

function Factory(AvailService) {
  return class extends AvailService {
    constructor(name, dependencies, init, logOptions={}) {
      super(name, dependencies, init);
      this.log = bunyan.createLogger(Object.assign(DEFAULT_LOG_OPTIONS, {
        name: name || 'avail-service'
      }, logOptions));
    }
  };
}

/**
 *
 * @param {Object} (logOptions) - bunyan log options
 * @param {Avail} (AvailService) [Avail]
 * @returns {Function<Avail>}
 * @constructor
 */
function WithBunyan(logOptions, AvailService=Avail) {
  /**
   *
   * @param {String} name
   * @param {Array<Avail>} (dependencies)
   * @param {Function<Promise<*>>} (init)
   */
  return (name, dependencies, init) => new (Factory(AvailService))(name, dependencies, init, logOptions);
}

module.exports = WithBunyan;