/* eslint-disable @typescript-eslint/no-var-requires */
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe(evt => {
  console.log('evt.action', evt.action);
  if (evt.action === 'reload') {
    window.location.reload();
  }
});
