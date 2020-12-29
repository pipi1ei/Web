import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import App from './CSSTransitionApp';
// import App from './SwitchTransitionApp';
import App from './TransitionGroupApp';

// import "antd/dist/antd.css";
import 'antd/dist/antd.less';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
