import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { SubTask } from '../types';

type MyTableProps = {
    subtasks: SubTask[];
    loading: boolean;
};

const MyTableSubtask = ( {subtasks, loading }:MyTableProps) => {    
    const columns = [
    {
        name: `タスク名`,
        selector: (row: SubTask) => row.title,
        sortable: true,
        filter: true,
    },
    {
        name: `内容`,
        selector: (row: SubTask) => row.detail,
        sortable: true,
        filter: true,
    },
    {
        name: `ステータス`,
        selector: (row: SubTask) => row.status,
        sortable: true,
        filter: true,
    },
    ];
    return (
        <DataTable
            title="サブタスク一覧"
            columns={columns}
            data={subtasks}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
        />
    );
};


export default MyTableSubtask;
