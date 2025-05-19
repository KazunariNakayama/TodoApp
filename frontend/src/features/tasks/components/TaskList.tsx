import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Task } from '../types';
import { Link } from "react-router-dom";

// interface TaskListProps {
//     tasks: Task[];
//     loading: boolean;
// }

type MyTableProps = {
  tasks: Task[];
  loading: boolean;
  onDelete: (id: string) => void;
};

//interface MyTable  { tasks:TaskListProps, loading:TaskListProps, onDelete:(parame: number) => void; } 
// interface handleSubmit  {
//     onDelete({id});
// } 





const MyTable = ( {tasks, loading , onDelete }:MyTableProps) => {    
    // const handleDelete = (id: string) => (event: React.FormEvent) => {
    //     event.preventDefault()
    //     console.log('削除ボタンが押されました:', id);
    //     onDelete(id);
    // }
    // const handleDelete = (id: string) => {
    // console.log('削除ボタンが押されました:', id);
    // onDelete(id);
    // }

    const columns = [
    {
        name: `タスク名`,
        selector: (row: Task) => row.title,
        cell: (row) => (
      <Link to={`/about/${row.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        {row.title}
      </Link>
    ),
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
        selector: (row: Task) => row.completed ? '削除' : '',
        cell: (row: Task) => (
            <Button
                variant="contained"
                color="error"
                value={row.id}
                onClick={() => {console.log('削除ボタンon'); onDelete(row.id)}}
            >
                削除
            </Button>
            ),
        },
    ];
    return (
        <DataTable
            title="タスク一覧"
            columns={columns}
            data={tasks}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
        />
    );
};


export default MyTable;

/*
    {
        detail: `内容`,
        selector: (row: { detail: string; }) => row.detail,
        sortable: true,
        filter: true,
    },
    {
        due_date: `期日`,
        selector: (row: { due_date: string; }) => row.due_date,
        sortable: true,
        filter: true,
    },
    {
        status: `ステータス`,
        selector: (row: { status: string; }) => row.status,
        sortable: true,
        filter: true,
    },
    {
        delete: `削除`,
        button: true,
        cell: (row: { id: number; }) => {
            return (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        // TODO: Implement delete
                    }}
                >
                    <DeleteIcon />
                </Button>
            )
        }
    }
];
/*
const MyTable = () => {

    return (
        <DataTable
            columns={columns}
            data={data}
            striped={true}
        />
    );
};
*/



/*
        detail: (row: { id: number; }) => {
            return (
                <div>
                    <p>{row.id}</p>
                </div>
            )
        }
    }
];

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
            case `DONE`:
                return '完了';
            case `IN_PROGRESS`:
                return '進行中';
            case `TODO`:
                return '未完了';
            default:
                return status;
        }
    };

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [rowData, setRowData] = useState({name:"", number:0, active:false})

  const columns = [
    {
      name: 'Name',
      selector: (row: { name: string; }) => row.name,
    },
    {
      name: 'Number',
      selector: (row: { number: number; }) => row.number,
    },
    {
      name: 'Active',
      cell: (row: { active: boolean }) => (
        <Switch
          defaultChecked={row.active}
          disabled
        />
      )
    },
    {
      name: 'Edit',
      button: true,
      cell: (row: { name: string; number: number; active: boolean; }) => (
        <Button
          variant="contained"
          size="small"
          color="primary"
        >
          Edit
        </Button>
      )
    },
  ];

  const data = [
    {
      id: 1,
      name: 'John',
      number: 101,
      active: true,
    },
    {
      id: 2,
      name: 'Mary',
      number: 102,
      active: false,
    },
  ]

  return (
    <Box mt={3} ml={24} mr={24}>
      <DataTable
        columns={columns}
        data={data}
        striped={true}
      />
    </Box>
  )
}

*/