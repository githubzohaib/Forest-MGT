// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import "./index.css"

// ReactDOM.render(
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

// Get the root element
const container = document.getElementById('root');

// TypeScript assertion: tell TS this is not null
if (!container) throw new Error("Root container missing in index.html");

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
