import { useEffect, useState } from 'react';
import TaskList from './TaskList.tsx';
import { Task } from '../types.ts';
// import { UserFormInputs } from '../types.ts';
import TaskSearch from './TaskSearch.tsx';
import "react-datepicker/dist/react-datepicker.css"
import TaskModal from '../../components/TaskModal.tsx';
import useFetchTasks from '../huck/useTaskFetch.ts';
import { useNavigate } from "react-router-dom";


const App = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [loading, setLoading] = useState(true);

  //検索関連の宣言
  const [keyword, setKeyword] = useState('');
  const initialDate = new Date();
  const [due_date, setDue_date] = useState(initialDate);
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO');
  const { ftasks, floading, fetchTasks } = useFetchTasks();

  useEffect(() => {
    fetchTasks({ visibility: 'ACTIVE' });
  }, []);

  const options = [
    { value: 'todo', label: '未完了' },
    { value: 'in_progress', label: '進行中' },
    { value: 'Done', label: '完了' },
    { value: '', label: '選択を外す' }
  ]

  // const handleSearch = async (params: { keyword: string; due_date: string; status: string }) => {
  //   console.log('検索条件:', params);
  //   fetchTasks({
  //     keyword: params.keyword,
  //     due_date: params.due_date,
  //     status: params.status,
  //   });
  // };


  const handleArchive = async (id: string) => {
    console.log('id:', id);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/archive/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ visibility: 'ARCHIVED' }),
        }
      );

      if (!response.ok) {
        window.alert('タスクの削除に失敗しました');
        throw new Error('Failed to delete task');
      }

      // 最新タスクを再取得
      await fetchTasks({ visibility: 'ACTIVE' });
      // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/fetch?visibility=ACTIVE`);
      // if (!res.ok) throw new Error('Failed to fetch tasks');
      // const data = await res.json();
      // setTasks(data);

    } catch (err) {
      console.error('Failed to update visibility:', err);
    } finally {
      setLoading(false);
    }
  };


  const [showModal, setShowModal] = useState(false);
  const ShowModal = () => {
    setShowModal(true);
  }

  const handleCreate = async (params: { title: string; detail: string; due_date: string; status: string }) => {
    console.log('params:', params);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
      );

      if (!response.ok) {
        window.alert("タスクの作成に失敗しました")
        throw new Error('Failed to Create Task');
      }
      // const data = await response.json();
      // setTasks(data); // ← これが App の状態を更新！

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/fetch`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // モーダルの開閉状態を親コンポーネントのstateで管理
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/archived/");
  };

  return (
    <div>
      <div className='flex flex-row mb-5 mt-5'>
        <h2 className='text-3xl font-semibold text-gray-800 ml-2'>タスク管理</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto mr-2 font-bold text-black bg-white border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
        >
          ＋ 新規タスク
        </button>

        <TaskModal task={[{
          id: '',
          title: '',
          detail: '',
          due_date: new Date(),
          status: 'TODO',
          completed: false
        }]} modalbool={isModalOpen} setModalbool={setIsModalOpen} onCreate={handleCreate} />
      </div>
      <div className='ml-2'>
        <TaskSearch fetchTasks={fetchTasks} />
      </div>
      <TaskList tasks={ftasks ?? []} loading={floading} onArchive={handleArchive} />

      <div className="App">

      </div>

      <button
        onClick={handleBack}
        className="ml-auto mt-3 mb-3 mr-2 font-bold text-black bg-white border border-black text-l px-4 py-4 rounded hover:bg-red-600 hover:text-white transition"
      >
        アーカイブしたタスク
      </button>

    </div >
  );
};

export default App;

