import React, { useEffect, useState } from 'react';
import MyTable from '../components/TaskList.tsx'; // 下で定義するテーブル表示コンポーネント
import { Task } from '../types.ts';

//import UserForm from '../components/Taskquery.tsx';
import { UserFormInputs, SearchType, } from '../types.ts';
//import DateForm from '../components/TaskDue.tsx';


import UserForm from '../components/Taskquery2.tsx';



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
  
  //検索関連の宣言
  const [keyword, setKeyword] = useState('');
  const initialDate = new Date();
  const [due_date, setDue_date] = useState(initialDate);
  const [status, setStatus] = useState<'TODO'|'IN_PROGRESS'|'DONE'>('TODO');


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
  { value: '', label:'選択を外す'}
]

  return (
    <div>
      <h2>検索フォーム</h2>
      {/* <UserForm/> */}
      {/* <UserForm onSubmit={handleFormSubmit} /> */}
      {/* <h2>期日検索</h2> */}
      {/* <DateForm onSubmit={handleDueSubmit}/> */}
      {/* <h2>検索フォーム</h2>
      <DatePicker selected={startDate} onChange={handleChange}/>
      {/* <SimpleDatePicker selected={startDate} onChange={handleChange}/>       */}
      {/* <h2>ステータス検索</h2>
      <Select options={options} /> */} 
      <h2>ユーザー一覧</h2>
      <MyTable tasks={tasks} loading={loading} />
    </div>
  );
};

export default App;

