import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskListPage from './app/home/TaskListPage.tsx';
import DetailePage from './app/about/DetailPage.tsx';
import NotFound from './app/otherpages/NotFound.tsx';
import TaskArchiveList from './app/archive/TaskArchiveListPage.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/about/:id" element={<DetailePage />} />
        <Route path="/archived/" element={<TaskArchiveList/>} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
