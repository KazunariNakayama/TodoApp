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
        <DataTable
            title="タスク詳細"
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
