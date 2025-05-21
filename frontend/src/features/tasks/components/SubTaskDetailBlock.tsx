import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { SubTask } from '../types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type MyTableProps = {
    subtasks: SubTask[];
    loading: boolean;
};

const MyTableSubtask = ({ subtasks, loading }: MyTableProps) => {
    const statusLabelMap: Record<string, string> = {
        TODO: '未完了',
        IN_PROGRESS: '進行中',
        DONE: '完了',
    };
    const columns = [
        {
            name: `タスク名`,
            selector: (row: SubTask) => row.title,
            sortable: true,
            filter: true,
            grow: 4,
        },
        {
            name: `内容`,
            selector: (row: SubTask) => row.detail,
            sortable: true,
            filter: true,
            grow: 5,
            maxWidth: '30rem'
        },
        {
            name: `ステータス`,
            cell: (row: SubTask) => statusLabelMap[row.status] ?? row.status,
            // statusLabelMap(row.status)
            sortable: true,
            filter: true,
            grow: 2,
        },
    ];
    return (
        <div className="bg-white border-4 border-l-gray-300  rounded-2xl shadow-xl  mt-9">
            <DataTable
                // title="サブタスク一覧"
                columns={columns}
                data={subtasks}
                progressPending={loading}
                pagination
                highlightOnHover
                striped
            />
        </div>
    );
};


export default MyTableSubtask;
