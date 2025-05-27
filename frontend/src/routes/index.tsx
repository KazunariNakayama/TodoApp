// src/routes/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskListPage from '../app/home/TaskListPage.tsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
