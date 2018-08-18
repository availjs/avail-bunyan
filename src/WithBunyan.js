'use strict'

const Avail = require('@availjs/avail').Avail;
const bunyan = require('bunyan');

const DEFAULT_LOG_OPTIONS = {
  level: 'info',
  serializers: bunyan.stdSerializers
};

/**
 *
 * @param {String} (name)
 * @param {Object} (logOptions) - binyan
 */
function addLogger(name, logOptions={}) {
  this.log = bunyan.createLogger(Object.assign(DEFAULT_LOG_OPTIONS, {
    name: name || 'avail-service'
  }, logOptions));
}

/**
 *
 * @param {Object} logOptions
 * @param {Avail} (AvailService) [Avail]
 * @returns {Function<Avail>}
 * @constructor
 */
function WithBunyan(logOptions={}, AvailService=Avail) {
  return class extends AvailService {
    /**
     *
     * @param name
     * @param dependencies
     * @param init
     */
    constructor(name, dependencies, init) {
      super(name, dependencies, init);
      addLogger.call(this, name, logOptions);
    }
  };
}

module.exports = WithBunyan;