AvailBunyan
===========

Higher Order Bunyan Avail Service that adds a `log` method to your Avail Service. 
AvailBunyan is powered by [bunyan](https://github.com/trentm/node-bunyan).

## Installation
```bash
  npm i @availjs/avail-bunyan
```

## Usage
AvailBunyan exposes a Higher Order Service function called `WithBunyan`.
`WithBunyan` takes a [Bunyan Configuration Object](https://github.com/trentm/node-bunyan#constructor-api) and
returns an Avail Constructor. By default WithBunyan will use the Avail class as it's base class, but takes 
a Base Class as it's second parameter.

```javascript
  const {Avail} = require('@availjs/avail');
  const {WithBunyan, AddStandardLoggers} = require('@availjs/avail-bunyan');
  const Logger = require('bunyan');
  
  // bunyan configuration object
  const logOptions = {
    name: 'MyService',
    streams: [
      {
        stream: process.stdout,
        level: 'info'
      },
      {
        stream: process.stderr,
        level: 'error'
      }
    ]
  };
  
  class MyAvailService extends Avail {}
  
  const MyAvailServiceConstructor = WithBunyan(logOptions, MyAvailService);
  const myAvailService = new MyAvailServiceConstructor('MyAvailService');
  
  assert(myAvailService.log instanceof Logger);
  
  // avail-bunyan also includes a helper function to add standard loggers to your Avail instance.
  AddStandardLoggers(myAvailService); 
  // this will add logs for ON_START, ON_INIT, ON_READY, ON_STOP, and ON_ERROR 
```
