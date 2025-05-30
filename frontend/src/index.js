// src/index.js または src/main.tsx (Viteなら)
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import TaskListPage from './app/home/TaskListPage.tsx';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
