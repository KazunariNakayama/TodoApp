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










// import React, { useState } from 'react';

// function App() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getTasks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
//       const data = await response.json();
//       setData(data);
//     } catch (error) {
//       console.error('API Error:', error);
//       setData({ error: 'データの取得に失敗しました' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={getTasks}>データ取得</button>

//       {loading && <p>読み込み中...</p>}
//       {data && (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       )}
//     </div>
//   );
// }

// export default App;
