import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import App from './react-router基本使用/LinkApp';
// import App from './react-router基本使用/NavLinkApp';
// import App from './react-router基本使用/SwitchApp';
// import App from './react-router基本使用/RedirectApp';
// import App from './react-router高级/01-RouteNestApp';
// import App from './react-router高级/02-ManualJumpApp';
// import App from './react-router高级/03-ParamsApp';
import App from './react-router-config/App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


