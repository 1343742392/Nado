const utils = require('./utils')

worker.postMessage({
  msg: 'hello from worker: ' + utils.test(),
  buffer: utils.str2ab('hello arrayBuffer from worker')
})

worker.onMessage((msg) => 
{

})