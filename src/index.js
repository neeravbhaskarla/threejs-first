import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {unmountComponentAtNode} from '@react-three/fiber'

ReactDOM.render(
  <React.StrictMode>
    {/* <button onClick={()=>unmountComponentAtNode(document.querySelector('canvas'))}>unmountCanvas</button> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
