import Select from 'react-select'
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Button } from '@mui/material';
import {useForm} from 'react-hook-form';



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


const CreateForm : React.FC<Props> = ({ modalbool, setModalbool, onCreate }) => {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const initialDate = new Date();
    const [due_date, setDue_date] = useState(initialDate);
    const [status, setStatus] = useState('');

    const handletitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) return;
        setTitle(event.target.value);
    };
    const handledetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) return;
        setDetail(event.target.value);
    };
    const handledateChange = (due_date: Date| null) => {
        if (!due_date) return;
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
        { value: '', label:'非選択'}
    ]

    const filteredOptions = options.find((opt) => opt.value === status.toLowerCase())

    const handleSubmit = () => {
        onCreate({ title, detail, due_date, status });
    }

    const closeModal = () => {
        setModalbool(false);
        console.log(modalbool);
    };


    return (
        <>
        {modalbool ? (
        <div >
            <form onSubmit={handleSubmit} /*style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}*/>
                <label>
                        <input type="text" value={title} onChange={handletitleChange} />
                </label>
                <label>
                        <input type="text" value={detail} onChange={handledetailChange} />
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
            <Button /*type="submit"*/ variant="contained" color="primary" onClick={() => {handleSubmit(); closeModal();}}>OK</Button>
                </form>
        </div>
        ): (
            <></>
        )}</>
        ); 
}

export default CreateForm;

// constM odal = (props) => {
//     const closeModal = () => {
//         props.setShewModal(false);
//         console.log(props)
//     };

//   return (
//     <>
//     {props.showFlag ? (
//       <div id="overlay">
//         <div id="modalContent">
//           <p>This is ModalContent</p>
//           <button onClick={closeModal}>Close</button>
//         </div>
//       </div>
//       ): (
//         <></>
//       )}
//     </>
//   );
// };

// export default Modal;