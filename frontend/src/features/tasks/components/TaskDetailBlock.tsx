import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DataTable from "react-data-table-component";
import { Task } from "../types";

type MyTableProps = {
    tasks: Task[];
    loading: boolean;
    onDelete: (id: string) => void;
};

const MyTable = ({ tasks, loading, onDelete }: MyTableProps) => {
    console.log("UpdateForm task: ", tasks);
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
                        console.log("削除ボタンon");
                        onDelete(row.id);
                    }}
                >
                    削除
                </Button>
            ),
        },
    ];
    return (
        <div className="bg-white border border-l-gray-950 h-[20rem] rounded-2xl shadow-2xl  mt-9">
            <div className="m-5">
                <h2 className='text-xl font-semibold text-gray-950'>タスク詳細</h2>
                <h3 className='text-sm font-semibold text-gray-500 mb-5'>タスクの詳細情報</h3>
                <div className="flex flax-row">
                    <label className='flex flex-col w-1/2'>
                        <span className="mb-1 text-sm font-medium text-gray-500">タスク名</span>
                        <span className="mb-1 text-xl font-medium text-gray-950">{tasks[0].title}</span>
                    </label>
                    <label className='flex flex-col w-1/2'>
                        <span className="mb-1 text-sm font-medium text-gray-500">ステータス</span>
                        <span className="mb-1 text-xl font-medium text-gray-950">{tasks[0].status}</span>
                    </label>
                </div>
                <label className='flex flex-col mt-5'>
                    <span className="mb-1 text-sm font-medium text-gray-500">期限</span>
                    <span className="mb-1 text-xl font-medium text-gray-950">{tasks[0].due_date}</span>
                </label>
                <label className='flex flex-col mt-5'>
                    <span className="mb-1 text-sm font-medium text-gray-500">内容</span>
                    <span className="mb-1 text-xl font-medium text-gray-950">{tasks[0].detail}</span>
                </label>
            </div>




        </div>
        // <DataTable
        //     title="タスク詳細"
        //     columns={columns}
        //     data={tasks}
        //     progressPending={loading}
        //     pagination
        //     highlightOnHover
        //     striped
        // />
    );
};

export default MyTable;
