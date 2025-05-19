// src/index.js または src/main.tsx (Viteなら)
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import TaskListPage from './features/tasks/pages/TaskListPage.tsx';
import './index.css';
//import App from './App.tsx';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <TaskListPage />
//   </React.StrictMode>
// );