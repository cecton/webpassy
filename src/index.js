import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import('./App')
  .then(m => {
    const App = m.default;
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch(e => console.log(e));
