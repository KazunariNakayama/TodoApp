import React, { useEffect, useState } from 'react';
import MyTable from './app/home/TaskList.tsx'; // 下で定義するテーブル表示コンポーネント

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  // 例：APIからデータを取得（DBのREST APIなど）
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>ユーザー一覧</h2>
      <MyTable tasks={tasks} loading={loading} />
    </div>
  );
};

export default App;
