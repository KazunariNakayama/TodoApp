import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Task } from '../types';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type MyTableProps = {
    tasks: Task[];
    loading: boolean;
    onArchive: (id: string) => void;
};

const TaskList = ({ tasks, loading, onArchive }: MyTableProps) => {
    console.log("UpdateForm task: ", tasks);
    const statusLabelMap: Record<string, string> = {
        TODO: '未完了',
        IN_PROGRESS: '進行中',
        DONE: '完了',
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
            grow: 5,
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
            grow: 3
        },
        {
            name: `ステータス`,
            cell: (row: Task) => statusLabelMap[row.status] ?? row.status,
            sortable: true,
            filter: true,
            grow: 2
        },
        {
            name: `アクション`,
            button: true,
            selector: (row: Task) => row.completed ? '削除' : '',
            cell: (row: Task) => (
                <Button
                    variant="contained"
                    color="error"
                    value={row.id}
                    onClick={() => { console.log('削除ボタンon'); onArchive(row.id) }}
                    sx={{
                        fontSize: '0.9rem', // 文字サイズを小さく
                        padding: '6px 9px', // 上下左右の余白を調整
                        minWidth: 'unset',  // 幅の最小値制限を解除
                        whiteSpace: 'nowrap', // 折り返しを防ぐ
                    }}
                >
                    アーカイブ
                </Button>

            ),
            grow: 3
        },
    ];
    return (
        <div className="bg-white border-4 border-l-gray-300  rounded-2xl shadow-xl  mt-9">
            <DataTable
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
