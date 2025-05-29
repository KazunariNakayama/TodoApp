import Select from 'react-select'
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Button } from '@mui/material';
import { ja } from 'date-fns/locale';

type TaskSearchProps = {
    fetchTasks: (params: {
        keyword?: string;
        due_date?: string;
        status?: string;
        visibility?: string;
    }) => Promise<void>;
};

const TaskArchiveSearch = ({ fetchTasks }: TaskSearchProps) => {
    const [keyword, setKeyword] = useState('');
    const initialDate = new Date();
    const [due_date, setDue_date] = useState(initialDate);
    const [status, setStatus] = useState('');
    const [visibility, setVisibility] = useState('ARCHIVED');
    const handlekeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };
    const handledateChange = (due_date: Date | null) => {
        // if (!due_date) return;
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
        { value: '', label: '絞り込みなし' }
    ]

    const filteredOptions = options.find((opt) => opt.value === status.toLowerCase())

    const handleSubmit = (event) => {
        console.log('TaskSearchのlog', keyword, due_date, status)
        event.preventDefault();
        fetchTasks({
            keyword,
            due_date: due_date,
            status,
            visibility,
        });
        console.log('keyword', keyword);
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
                <label>
                    <input type="text" value={keyword} onChange={handlekeyChange}
                        placeholder="タスク名または内容で検索"
                        className="p-2 border border-gray-300 rounded-md" />
                </label>
                <DatePicker
                    selected={due_date}
                    onChange={handledateChange}
                    locale={ja}
                    shouldCloseOnSelect={true}
                    isClearable
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholderText="日付を選択"
                    dateFormat="yyyy/MM/dd"
                    // popperClassName="z-100"
                    calendarClassName="bg-white border border-gray-300 rounded-lg shadow-md"
                />
                {/* .toLowerCaseは小文字化する処理 */}
                <Select
                    options={options}
                    value={filteredOptions}
                    placeholder="ステータスで絞り込み"
                    styles={{
                        control: (base) => ({
                            ...base,
                            width: 220, // ← pxで明示指定
                            minWidth: 200,
                        }),
                    }}
                    onChange={handlestatusChange}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                        borderColor: '#000',        // 黒枠
                        color: '#000',              // 通常時：黒文字
                        backgroundColor: '#fff',    // 通常時：白背景
                        '&:hover': {
                            backgroundColor: '#000',  // ホバー時：黒背景
                            color: '#fff',            // ホバー時：白文字
                            borderColor: '#000',      // 枠線はそのまま黒
                        },
                    }}
                >検索</Button>
            </form>
        </div>
    );
}

export default TaskArchiveSearch;