import React, { useEffect, useState } from 'react';
import TaskList from './TaskList.tsx';
import { Task } from '../types.ts';
import { UserFormInputs, SearchType, } from '../types.ts';
import TaskSearch from './TaskSearch.tsx';
import "react-datepicker/dist/react-datepicker.css"
import TaskModal from '../../components/TaskModal.tsx';


const App = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [loading, setLoading] = useState(true);

  //検索関連の宣言
  const [keyword, setKeyword] = useState('');
  const initialDate = new Date();
  const [due_date, setDue_date] = useState(initialDate);
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO');


  // 例：APIからデータを取得（DBのREST APIなど）
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        id: '',
        title: '',
        due_date: '',
        status: '',
      });
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/fetch?${query}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: 'todo', label: '未完了' },
    { value: 'in_progress', label: '進行中' },
    { value: 'Done', label: '完了' },
    { value: '', label: '選択を外す' }
  ]

  const handleSearch = async (params: { keyword: string; due_date: string; status: string }) => {
    console.log('検索条件:', params);
    setLoading(true);
    try {
      const query = new URLSearchParams({
        id: '',
        title: params.keyword,
        due_date: params.due_date,
        status: params.status,
      }).toString();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/fetch?${query}`
      );
      console.log(`${process.env.REACT_APP_API_URL}/api/tasks/fetch?${query}`)

      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data); // ← これが App の状態を更新！
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (params: string) => {
    console.log('id:', params);
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
        <TaskSearch onSearch={handleSearch} />
      </div>
      <TaskList tasks={tasks ?? []} loading={loading} onDelete={handleDelete} />

      <div className="App">

      </div>

    </div >
  );
};

export default App;

