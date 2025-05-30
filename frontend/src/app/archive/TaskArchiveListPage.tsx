import { useEffect, useState } from 'react';
import TaskList from './TaskArchiveList.tsx';
import TaskArchiveSearch from './TaskArchiveSearch.tsx';
import "react-datepicker/dist/react-datepicker.css"
import useFetchTasks from '../huck/useTaskFetch.ts';
import { useNavigate } from "react-router-dom";


const TaskArchiveList = () => {
  const [loading, setLoading] = useState(true);

  //検索関連の宣言
  const { ftasks, floading, fetchTasks } = useFetchTasks();

  useEffect(() => {
    fetchTasks({ visibility: 'ARCHIVED' });
  }, []);

  const handleActive = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/archive/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ visibility: 'ACTIVE' }),
        }
      );

      if (!response.ok) {
        window.alert('タスクの削除に失敗しました');
        throw new Error('Failed to delete task');
      }
      // 最新タスクを再取得
      await fetchTasks({ visibility: 'ARCHIVED' });
    } catch (err) {
      console.error('Failed to update visibility:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (params: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/${params}}`, {
        method: `DELETE`,
      }
      );
      if (!response.ok) {
        window.alert('タスクの削除に失敗しました');
        throw new Error('Failed to Delete Task');
      }
      // 最新タスクを再取得
      await fetchTasks({ visibility: 'ARCHIVED' });
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };



  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleBack}
        className="ml-auto mt-3 mb-3 mr-2 font-bold text-black bg-white border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition"
      >
        ← タスク一覧に戻る
      </button>
      <div className='flex flex-row mb-5 mt-5'>
        <h2 className='text-3xl font-semibold text-gray-800 ml-2'>アーカイブ タスク</h2>

      </div>
      <div className='ml-2'>
        <TaskArchiveSearch fetchTasks={fetchTasks} />
      </div>
      <TaskList tasks={ftasks ?? []} loading={floading} onActive={handleActive} onDelete={handleDelete} />

      <div className="App">

      </div>

    </div >
  );
};

export default TaskArchiveList;

