import React, { useEffect, useState } from 'react';
import MyTable from '../components/TaskList.tsx'; // 下で定義するテーブル表示コンポーネント
import { Task } from '../types.ts';

//import UserForm from '../components/Taskquery.tsx';
import { UserFormInputs, SearchType, } from '../types.ts';
//import DateForm from '../components/TaskDue.tsx';


import UserFormProps from '../components/Taskquery2.tsx';
import CreateForm from '../components/TaskCreate.tsx';

//カレンダー直書き
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
//直書きはしない！
//import SimpleDatePicker from '../components/TaskDue2.tsx';

//プルダウン直書き
import Select from 'react-select'

import Modal from '../components/Modal.tsx'
import { RxCross1 } from "react-icons/rx";




const App = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [loading, setLoading] = useState(true);

  //検索関連の宣言
  const [keyword, setKeyword] = useState('');
  const initialDate = new Date();
  const [due_date, setDue_date] = useState(initialDate);
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO');


  //   const handleChange = (date) => {
  //     setDue_date(due_date);
  //   }

  // 例：APIからデータを取得（DBのREST APIなど）
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/search`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data: UserFormInputs) => {
    // setLoading(true);
    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/search`);
    //   if (!response.ok) throw new Error('Failed to fetch tasks');
    //   const data = await response.json();
    //   setTasks(data);
    // } catch (err) {
    //   console.error('Failed to fetch tasks:', err);
    // } finally {
    //   setLoading(false);
    // //console.log('フォーム送信データ:', data);
    // //alert(`送信成功：${data.name} `);
    // // ここでAPIなどに送信してもOK
  };


  // const handleDueSubmit = (data) => {
  //   console.log('期日送信データ:', data);
  //   alert(`送信成功`);
  // }


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
        `${process.env.REACT_APP_API_URL}/api/tasks/search?${query}`
      );
      console.log(`${process.env.REACT_APP_API_URL}/api/tasks/search?${query}`)

      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data); // ← これが App の状態を更新！
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };


  <UserFormProps onSearch={handleSearch} />


  const handleDelete = async (params: string) => {
    console.log('id:', params);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/${params}}`, {
        method: `DELETE`,
      }
      );

      if (!response.ok) throw new Error('Failed to Delete Task');
      // const data = await response.json();
      // setTasks(data); // ← これが App の状態を更新！

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/search`);
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

  <MyTable tasks={tasks ?? []} loading={loading} onDelete={handleDelete} />

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

      if (!response.ok) throw new Error('Failed to Create Task');
      // const data = await response.json();
      // setTasks(data); // ← これが App の状態を更新！

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/search`);
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
      <label className='flex flex-row mb-5 mt-5'>
        <h2 className='text-xl font-semibold text-gray-800 ml-2'>タスク管理</h2>
        <button className="ml-auto"
          variant="contained" color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-xl font-bold leading-none mr-5" >＋ 新規タスク</span>
        </button>
        <Modal modalbool={isModalOpen} setModalbool={setIsModalOpen} onCreate={handleCreate} />
      </label>


      {/* <button onClick={ShowModal}>タスク追加ボタン</button>
      <CreateForm modalbool={showModal} setModalbool={setShowModal} onCreate={handleCreate}/> */}
      {/* <h2>検索フォーム</h2> */}
      {/* <button onClick={ShowModal}>Open Modal</button> */}
      <div className='ml-2'>
        <UserFormProps onSearch={handleSearch} />
      </div>
      {/* <UserForm onSubmit={handleFormSubmit} /> */}
      {/* <h2>期日検索</h2> */}
      {/* <DateForm onSubmit={handleDueSubmit}/> */}
      {/* <h2>検索フォーム</h2>
      <DatePicker selected={startDate} onChange={handleChange}/>
      {/* <SimpleDatePicker selected={startDate} onChange={handleChange}/>       */}
      {/* <h2>ステータス検索</h2>
      <Select options={options} /> */}
      <MyTable tasks={tasks ?? []} loading={loading} onDelete={handleDelete} />

      <div className="App">

      </div>

    </div>
  );
};

export default App;

