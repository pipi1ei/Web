import React from 'react';
import ReactDOM from 'react-dom';
// import App from './01_custom/App';
import App from './02_react-redux/App';
import { Provider } from 'react-redux'

import { StoreContext } from './01_custom/context'
import store from './02_react-redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <StoreContext.Provider value={store}>
//     <App />
//   </StoreContext.Provider>,
//   document.getElementById('root')
// );
