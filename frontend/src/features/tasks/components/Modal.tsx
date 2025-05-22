import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Task, TaskStatus } from '../types';
import { ja } from 'date-fns/locale';
import dayjs from 'dayjs';

const MAX_TITLE = 20;
const MAX_DETAIL = 255;
const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE"];


interface Props {
  modalbool: boolean;
  setModalbool: React.Dispatch<React.SetStateAction<boolean>>;
  onCreate: (params: {
    title: string;
    detail: string;
    due_date: string;
    status: string;
  }) => Promise<void>;
}


type Form = {
  title: string
  detail: string
  due_date: string
  status: TaskStatus
  check: boolean
}


const CreateForm: React.FC<Props> = ({ modalbool, setModalbool, onCreate }) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const initialDate = new Date();
  const [due_date, setDue_date] = useState(initialDate);
  const [status, setStatus] = useState('');

  const [errors, setError] = useState<{
    title?: string;
    detail?: string;
    due_date?: string;
    status?: string;
  }>({});

  useEffect(() => {
    validate();
  }, [title, detail, due_date, status]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "タスク名を入力してください";
    } else if (title.length > MAX_TITLE) {
      newErrors.title = `タスク名は${MAX_TITLE}文字以内で入力してください`;
    }
    if (!detail.trim()) {
      newErrors.detail = "タスク名を入力してください";
    } else if (detail.length > MAX_DETAIL) {
      newErrors.detail = `タスク名は${MAX_DETAIL}文字以内で入力してください`;
    }
    if (!due_date || isNaN(new Date(due_date).getTime()) || due_date < today) {
      newErrors.due_date = "有効な期限を選択してください";
    }
    if (!STATUS_OPTIONS.includes(status)) {
      newErrors.status = "有効なステータスを選択してください";
    }

    setError(newErrors);
  }

  const isValid = Object.keys(errors).length == 0;


  const handleSubmit = (e: React.FormEvent) => {
    //e.preventDefault();
    if (isValid) {
      onCreate({ title, detail, due_date, status: status.toUpperCase() as 'TODO' | 'IN_PROGRESS' | 'DONE', });
    } //else {
    //   const confirmed = window.confirm(`${errors.title} ${errors.detail} ${errors.due_date} ${errors.status}`);
    //   if (confirmed) {
    //     console.log('フォームに戻る');
    //   }
    // }
  }


  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<Form>()

  const handletitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //if (!event.target.value) return;
    setTitle(event.target.value);
  };
  const handledetailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //if (!event.target.value) return;
    setDetail(event.target.value);
  };
  const handledateChange = (due_date: Date | null) => {
    //if (!due_date) return;
    setDue_date(due_date);
  };
  const handlestatusChange = (selected: { value: string; label: string } | null) => {
    if (!selected) {
      setStatus(''); // 非選択時の挙動（必要に応じて調整）
      return;
    }
    setStatus(selected.value.toUpperCase() as 'TODO' | 'IN_PROGRESS' | 'DONE');
  };

  const options = [
    { value: 'todo', label: '未完了' },
    { value: 'in_progress', label: '進行中' },
    { value: 'Done', label: '完了' },
  ]

  const filteredOptions = options.find((opt) => opt.value === status.toLowerCase())



  const closeModal = () => {
    setModalbool(false);
    console.log(modalbool);
  };
  if (!modalbool) {
    return null;
  }


  const FieldError = ({ message }: { message?: string }) => (
    <p className="text-sm text-red-500 min-h-[1.5rem]">
      {message ?? ""}
    </p>
  );


  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
      onClick={closeModal}
    >
      <div
        className="bg-white h-[36.5rem] w-[35rem] rounded-2xl shadow-2xl"
        //NOTE:コンポーネントの外側をクリックしたときにモーダルを閉じることができるように
        //NOTE:これは内側をクリックしてもモーダルが閉じないようにするための処理
        onClick={(e) => e.stopPropagation()}
      >
        <form className='flex flex-col gap-3 p-5' /*style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}*/>
          <div className='flex flex-row'>
            <h2 className='text-3xl font-semibold text-gray-800'>新規タスク作成</h2>
            <button className="ml-auto"
              onClick={closeModal}
            >
              <span className="text-3xl font-bold leading-none">&times;</span>
            </button>
          </div>
          <label className="flex flex-col">
            <span className="mb-1 text-sm font-medium text-gray-700">タスク名(20文字まで)</span>
            <input type="text" value={title} onChange={handletitleChange}
              className={`p-2 border border-gray-300 rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`} />
            <FieldError message={errors.title} />
            {/* <p className="text-sm text-red-500 invisible">
              エラーメッセージ（プレースホルダ）
            </p>
            {errors.title && <p className="text-sm text-red-500 absolute">{errors.title}</p>} */}
          </label>
          <label className='flex flex-col'>
            <span className="mb-1 text-sm font-medium text-gray-700">内容(255文字まで)</span>
            <textarea value={detail}
              onChange={handledetailChange}
              rows={3}
              className={`p-2 border border-gray-300 rounded-md ${errors.detail ? "border-red-500" : "border-gray-300"}`} />
            <FieldError message={errors.detail} />
          </label>
          <label className='flex flex-col'>
            <span className="mb-1 text-sm font-medium text-gray-700">期日設定</span>
            <DatePicker
              selected={due_date}
              onChange={handledateChange}
              locale={ja}
              shouldCloseOnSelect={true}
              placeholderText="日付を選択"
              dateFormat="yyyy/MM/dd"
              // popperClassName="z-100"
              calendarClassName="bg-white border border-gray-300 rounded-lg shadow-md"
              className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${errors.due_date ? "border-red-500" : "border-gray-300"}`} />
            <FieldError message={errors.due_date} />
            {/* .toLowerCaseは小文字化する処理 */}
          </label>
          <label className="flex flex-col">
            <span className="mb-1 text-sm font-medium text-gray-700">ステータス選択</span>
            <Select
              options={options}
              value={filteredOptions}
              onChange={handlestatusChange}
              className={`${errors.status ? "border-red-500" : "border-gray-300"}`} />
            <FieldError message={errors.status} />
          </label>
        </form>
        <form action="" onSubmit={handleSubmit}>
          <div className='flex justify-end pr-5'>
            <button
              className="mr-5 bg-black3 w-20 py-1 text-black2 border border-gray-300 rounded-md"
              onClick={closeModal}
            >
              <span className="mb-1 text-sm font-medium text-gray-700">キャンセル</span>
            </button>
            <Button
              type="submit"
              disabled={!isValid}
              className={`mr-5 bg-black3 w-20 py-1 ${isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              variant="contained" color="primary"
            >作成</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;