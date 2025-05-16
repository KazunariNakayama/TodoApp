//import { Select } from '@mui/material';
import Select from 'react-select'
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Button } from '@mui/material';
import {useForm} from 'react-hook-form';


interface UserFomeProps {
    onSearch: (parames: {keyword: string, due_date: string , status: string  }) => void;
}

const UserFormProps = ({onSearch}) => {
    const [keyword, setKeyword] = useState('');
    const initialDate = new Date();
    const [due_date, setDue_date] = useState(initialDate);
    const [status, setStatus] = useState('');

    const handlekeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) return;
        setKeyword(event.target.value);
    };
    const handledateChange = (due_date: Date| null) => {
        if (!due_date) return;
        setDue_date(due_date);
    };
    // const handlestatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!event.target.value) return;
    //     setStatus('DONE');
    // };
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
        { value: '', label:'非選択'}
    ]

    const filteredOptions = options.find((opt) => opt.value === status.toLowerCase())

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch({keyword, due_date, status});
    }

    return (
        <div >
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label>
                        <input type="text" value={keyword} onChange={handlekeyChange} />
                </label>
            <DatePicker
                selected={due_date}
                onChange={handledateChange}
                />
            {/* .toLowerCaseは小文字化する処理 */}
            <Select
                options={options}
                value={filteredOptions}
                onChange={handlestatusChange}
                />
            <Button type="submit" variant="contained" color="primary" /*onClick={handleSubmit}*/>検索</Button>
                </form>
        </div>
        
        ); 
}

export default UserFormProps;