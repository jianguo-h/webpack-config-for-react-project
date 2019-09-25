import App from './App';
import React from 'react';
import ReactDom from 'react-dom';

if(module.hot) {
  module.hot.accept();
}

ReactDom.render(
  <App />,
  document.getElementById('app')
);