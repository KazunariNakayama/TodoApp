import { useState } from 'react';
import { Task } from '../types';

type Params = {
    id?: string;
    keyword?: string;
    due_date?: string;
    status?: string;
    visibility: string;
};

export const useFetchTasks = () => {
    const [ftasks, setTasks] = useState<Task[]>([]);
    const [floading, setFLoading] = useState(false);

    const fetchTasks = async (params: Params) => {
        const query = new URLSearchParams({
            id: params.id ?? '',
            title: params.keyword ?? '',
            due_date: params.due_date ?? '',
            status: params.status ?? '',
            visibility: params.visibility ?? '',
        }).toString();
        console.log('fetchTasks called with params:', params);
        console.log('taskFetch: query =', query);
        console.log('fetchみちゃうよ！！', query);


        setFLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/fetch?${query}`);
        const data = await response.json();
        console.log('fetchみちゃうよ！！', data);
        setTasks(data);
        setFLoading(false);
    };
    // console.log('taskFetch: ftasks =', ftasks);
    // console.log('taskFetch: floading =', floading);


    return { ftasks, floading, fetchTasks };
};

export default useFetchTasks