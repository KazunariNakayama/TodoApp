import { Button } from "@mui/material";
import { Task } from "../types";
import { format, isValid } from 'date-fns';
import { ja } from 'date-fns/locale';


type MyTableProps = {
    tasks: Task[];
    loading: boolean;
    onDelete: (id: string) => void;
};

const TaskDetailBlock = ({ tasks, loading, onDelete }: MyTableProps) => {
    const options = [
        { value: 'todo', label: '未完了' },
        { value: 'in_progress', label: '進行中' },
        { value: 'done', label: '完了' },
    ];
    const statusLabelMap = {
        TODO: '未完了',
        IN_PROGRESS: '進行中',
        DONE: '完了',
    };
    const columns = [
        {
            name: `タスク名`,
            selector: (row: Task) => row.title,
            sortable: true,
            filter: true,
        },
        {
            name: `内容`,
            selector: (row: Task) => row.detail,
            sortable: true,
            filter: true,
        },
        {
            name: `期日`,
            selector: (row: Task) => row.due_date,
            sortable: true,
            filter: true,
        },
        {
            name: `ステータス`,
            selector: (row: Task) => row.status,
            sortable: true,
            filter: true,
        },
        {
            name: `削除`,
            button: true,
            selector: (row: Task) => (row.completed ? "削除" : ""),
            cell: (row: Task) => (
                <Button
                    variant="contained"
                    color="secondary"
                    value={row.id}
                    onClick={() => {
                        onDelete(row.id);
                    }}
                >
                    削除
                </Button>
            ),
        },
    ];
    return (
        <div className="bg-white border-4 border-l-gray-300 h-[23.5rem] rounded-2xl shadow-xl  mt-9">
            <div className="m-5">
                <h2 className='text-2xl font-semibold text-gray-950'>タスク詳細</h2>
                <h3 className='text-sm font-semibold text-gray-500 mb-5'>タスクの詳細情報</h3>
                <div className="flex flax-row">
                    <label className='flex flex-col w-1/2'>
                        <span className="mb-1 text-sm font-medium text-gray-500">タスク名</span>
                        <span className="mb-1 text-xl font-medium text-gray-950">{tasks[0]?.title || "error"}</span>
                    </label>
                    <label className='flex flex-col w-1/2'>
                        <span className="mb-1 text-sm font-medium text-gray-500">ステータス</span>
                        <span className="mb-1 text-xl font-medium text-gray-950">{statusLabelMap[tasks[0]?.status] || "error"}</span>
                    </label>
                </div>
                <label className='flex flex-col mt-5'>
                    <span className="mb-1 text-sm font-medium text-gray-500">期限</span>
                    {<span className="mb-1 text-xl font-medium text-gray-950">{isValid(new Date(tasks[0]?.due_date ?? "")) ? format(new Date(tasks[0]?.due_date), 'yyyy/MM/dd', { locale: ja }) : "error"}</span>}
                </label>
                <label className='flex flex-col mt-5'>
                    <span className="mb-1 text-sm font-medium text-gray-500">内容</span>
                    <span
                        className="mb-1 text-xl font-medium text-gray-950 max-h-[5.5rem] overflow-y-auto block"
                    >
                        {tasks[0]?.detail || "error"}
                    </span>
                </label>
            </div>




        </div>

    );
};

export default TaskDetailBlock;
