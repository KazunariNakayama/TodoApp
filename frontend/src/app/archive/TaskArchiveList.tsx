import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Task } from '../types';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';


type MyTableProps = {
    tasks: Task[];
    loading: boolean;
    onActive: (id: string) => void;
    onDelete: (id: string) => void;
};


const TaskList = ({ tasks, loading, onActive, onDelete }: MyTableProps) => {
    const statusLabelMap: Record<string, string> = {
        TODO: '未完了',
        IN_PROGRESS: '進行中',
        DONE: '完了',
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm('本当に削除しますか？ この操作は取り消せません。');
        if (confirmed) {
            onDelete(id)
            console.log('削除されました');
        } else {
            console.log('キャンセルされました');
        }
    };
    const columns = [
        {
            name: `タスク名`,
            selector: (row: Task) => row.title,
            cell: (row) => (
                <div className='underline hover:underline  hover:text-blue-500 cursor-pointer'>
                    <Link to={`/about/${row.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {row.title}
                    </Link>
                </div>
            ),
            sortable: true,
            filter: true,
            grow: 6,
            maxWidth: '30rem'
        },
        {
            name: `内容`,
            selector: (row: Task) => row.detail,
            sortable: true,
            filter: true,
            grow: 5,
            maxWidth: '30rem'
        },
        {
            name: `期限`,
            cell: row => format(new Date(row.due_date), 'yyyy/MM/dd', { locale: ja }),
            sortable: true,
            filter: true,
            grow: 2
        },
        {
            name: `ステータス`,
            cell: (row: Task) => statusLabelMap[row.status] ?? row.status,
            sortable: true,
            filter: true,
            grow: 2
        },
        {
            name: `復元`,
            button: true,
            selector: (row: Task) => row.completed ? '復元' : '',
            cell: (row: Task) => (
                <Button
                    variant="contained"
                    color="warning"
                    value={row.id}
                    onClick={() => { console.log('復元ボタンon'); onActive(row.id) }}
                >
                    復元
                </Button>

            ),
            grow: 2
        },
        {
            name: `削除`,
            button: true,
            selector: (row: Task) => row.completed ? '削除' : '',
            cell: (row: Task) => (
                <Button
                    variant="contained"
                    color="error"
                    value={row.id}
                    onClick={() => { console.log('削除ボタンon'); handleDelete(row.id) }}
                >
                    削除
                </Button>

            ),
            grow: 2
        },
    ];
    return (
        <div className="bg-white border-4 border-l-gray-300  rounded-2xl shadow-xl  mt-9">
            <DataTable
                // title="タスク一覧"
                columns={columns}
                data={tasks}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
                noDataComponent={<p>該当するデータがありません</p>}
            />
        </div>
    );
};


export default TaskList;
