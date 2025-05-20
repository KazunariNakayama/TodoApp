import Select from "react-select";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { ja } from "date-fns/locale";

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

const CreateSubtaskForm: React.FC<Props> = ({
    modalbool,
    setModalbool,
    onCreate,
}) => {
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const initialDate = new Date();
    const [due_date, setDue_date] = useState(initialDate);
    const [status, setStatus] = useState("todo");

    const handletitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //if (!event.target.value) return;
        setTitle(event.target.value);
    };
    const handledetailChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        //if (!event.target.value) return;
        setDetail(event.target.value);
    };
    const handledateChange = (due_date: Date | null) => {
        //if (!due_date) return;
        setDue_date(due_date);
    };
    const handlestatusChange = (
        selected: { value: string; label: string } | null
    ) => {
        if (!selected) {
            setStatus(""); // 非選択時の挙動（必要に応じて調整）
            return;
        }
        setStatus(selected.value.toUpperCase() as "TODO" | "IN_PROGRESS" | "DONE");
    };

    const options = [
        { value: "todo", label: "未完了" },
        { value: "in_progress", label: "進行中" },
        { value: "Done", label: "完了" },
    ];

    const filteredOptions = options.find(
        (opt) => opt.value === status.toLowerCase()
    );

    const handleSubmit = () => {
        onCreate({ title, detail, due_date, status });
    };

    const closeModal = () => {
        setModalbool(false);
        console.log(modalbool);
    };
    if (!modalbool) {
        return null;
    }
    return (
        <div
            className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
            onClick={closeModal}
        >
            <div
                className="bg-white h-[32rem] w-[35rem] rounded-2xl shadow-2xl"
                //NOTE:コンポーネントの外側をクリックしたときにモーダルを閉じることができるように
                //NOTE:これは内側をクリックしてもモーダルが閉じないようにするための処理
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 p-5" /*style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}*/
                >
                    <label className="flex flex-row">
                        <h2 className="text-xl font-semibold text-gray-800">
                            サブタスク作成
                        </h2>
                        <button className="ml-auto" onClick={closeModal}>
                            <span className="text-xl font-bold leading-none">&times;</span>
                        </button>
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 text-sm font-medium text-gray-700">
                            タスク名
                        </span>
                        <input
                            type="text"
                            value={title}
                            onChange={handletitleChange}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </label>
                    <label className="flex flex-col mb-3">
                        <span className="mb-1 text-sm font-medium text-gray-700">内容</span>
                        <textarea
                            value={detail}
                            onChange={handledetailChange}
                            className="p-2 border border-gray-300 rounded-md resize-none overflow-y-auto"
                            rows={3}
                        />
                    </label>
                    {/* <label className='flex flex-col mb-3'>
              <span className="mb-1 text-sm font-medium text-gray-700">期日設定</span>
            <DatePicker
                selected={due_date}
                onChange={handledateChange}
                locale={ja}
                shouldCloseOnSelect={true}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholderText="日付を選択"
                dateFormat="yyyy/MM/dd"
                // popperClassName="z-100"
                calendarClassName="bg-white border border-gray-300 rounded-lg shadow-md"
                />
            </label> */}
                    <label className="flex flex-col">
                        <span className="mb-1 text-sm font-medium text-gray-700">
                            ステータス選択
                        </span>
                        <Select
                            options={options}
                            value={filteredOptions}
                            onChange={handlestatusChange}
                        />
                    </label>
                </form>
                <form action="">
                    <div className="flex justify-end pr-5">
                        <button
                            className="mr-5 bg-black3 w-20 py-1 text-black2 border border-gray-300 rounded-md"
                            onClick={closeModal}
                        >
                            <span className="mb-1 text-sm font-medium text-gray-700">
                                キャンセル
                            </span>
                        </button>
                        <Button
                            className="mr-5 bg-black3 w-20 py-1 "
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                handleSubmit();
                                closeModal();
                            }}
                        >
                            作成
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSubtaskForm;
