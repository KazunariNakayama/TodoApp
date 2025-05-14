import React, { useEffect, useState } from 'react';
import MyTable from '../components/TaskList.tsx'; // 下で定義するテーブル表示コンポーネント
import { Task } from '../types.ts';

import UserForm from '../components/Taskquery.tsx';
import { UserFormInputs } from '../types.ts';
//import DateForm from '../components/TaskDue.tsx';

//カレンダー直書き
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
//直書きはしない！
//import SimpleDatePicker from '../components/TaskDue2.tsx';

//プルダウン直書き
import Select from 'react-select'



const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialDate = new Date()
  const [startDate, setStartDate] = useState(initialDate)
  const handleChange = (date) => {
    setStartDate(date)
  }

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
    console.log('フォーム送信データ:', data);
    alert(`送信成功：${data.name} `);
    // ここでAPIなどに送信してもOK
  };


  // const handleDueSubmit = (data) => {
  //   console.log('期日送信データ:', data);
  //   alert(`送信成功`);
  // }


const options = [
  { value: 'todo', label: '未完了' },
  { value: 'in_progress', label: '進行中' },
  { value: 'Done', label: '完了' },
  { value: '', label:'選択を外す'}
]

  return (
    <div>
      <h2>検索フォーム</h2>
      <UserForm onSubmit={handleFormSubmit} />
      {/* <h2>期日検索</h2> */}
      {/* <DateForm onSubmit={handleDueSubmit}/> */}
      <h2>検索フォーム</h2>
      <DatePicker selected={startDate} onChange={handleChange}/>
      {/* <SimpleDatePicker selected={startDate} onChange={handleChange}/>       */}
      <h2>ステータス検索</h2>
      <Select options={options} />
      <h2>ユーザー一覧</h2>
      <MyTable tasks={tasks} loading={loading} />
    </div>
  );
};

export default App;


/*

import React, { useEffect, useState } from 'react';
//import { useForm, SubmitHandler } from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';
//import * as yup from 'yup';
import { Task } from '../types';
import MyTable from '../components/TaskList.tsx'; // 下で定義するテーブル表示コンポーネント
//import { FormInputs } from '../types';

const TaskListPage = () => {
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
            <h2>タスク一覧</h2>
            <MyTable tasks={tasks} loading={loading} />
        </div>
    );
};

export default TaskListPage;


*/


/*



import React, { useState, useEffect } from 'react';
import { Task } from '../types';

/*
function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return '-';
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        //hour: '2-digit',
        //minute: '2-digit'
      });
    } catch {
      return '-';
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'DONE':
        return '完了';
      case 'IN_PROGRESS':
        return '進行中';
      case 'TODO':
        return '未完了';
      default:
        return status;
    }
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  if (loading) return <div className="flex justify-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">タスク管理</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                タスク名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                内容
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                期限
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-0">
            {paginatedTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-0">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {task.detail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(task.due_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === 'DONE' 
                      ? 'bg-green-600 text-blue-100' 
                      : task.status === 'IN_PROGRESS'
                      ? 'bg-blue-600 text-blue-100'
                      : 'bg-red-600 text-blue-100'
                  }`}>
                    {getStatusDisplay(task.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    className="bg-red-600 text-red-100 hover:text-red-900"
                    onClick={() => {/* TODO: Implement delete *//*}}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TaskListPage;
*/