import App from './App';
import React from 'react';
import { render } from 'react-dom';

if (module.hot) {
  module.hot.accept();
}

render(<App />, document.getElementById('app'));
