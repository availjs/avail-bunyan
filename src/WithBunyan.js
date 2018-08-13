'use strict'

const Avail = require('@availjs/avail').Avail;
const bunyan = require('bunyan');

const DEFAULT_LOG_OPTIONS = {
  level: 'info',
  serializers: bunyan.stdSerializers
};

function Factory(AvailService) {
  return class extends AvailService {
    /**
     *
     * @param name
     * @param dependencies
     * @param init
     * @param logOptions
     */
    constructor(name, dependencies, init, logOptions={}) {
      super(name, dependencies, init);
      if (logOptions) {
        this.addLogger(name, logOptions);
      }
    }

    /**
     *
     * @param {String} (name)
     * @param {Object} (logOptions) - binyan
     */
    addLogger(name, logOptions={}) {
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
  return (name, dependencies, init, _logOptions) => {
    return new (Factory(AvailService))(name, dependencies, init, logOptions || _logOptions)
  };
}

module.exports = WithBunyan;