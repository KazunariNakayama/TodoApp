import React, { useEffect, useState } from "react";
import TaskDetailBlock from "./TaskDetailBlock.tsx"; // 下で定義するテーブル表示コンポーネント
import SubTaskDetailBlock from "./SubTaskDetailBlock.tsx"; // 下で定義するテーブル表示コンポーネント
import { Task, SubTask } from "../types.ts";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserFormInputs } from "../types.ts";
// import TaskSearch from "../home/TaskSearch.tsx";
import "react-datepicker/dist/react-datepicker.css";
import CreateSubtaskModal from "./createSubtaskModal.tsx";
import TaskModal from "../../components/TaskModal.tsx";

const App = () => {
  const [tasks, setTasks] = useState<Task>();
  const [subtasks, setSubTasks] = useState<SubTask[]>();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  //検索関連の宣言
  const [keyword, setKeyword] = useState("");
  const initialDate = new Date();
  const [due_date, setDue_date] = useState(initialDate);
  const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "DONE">("TODO");
  const { id } = useParams();

  console.log("取得したID", id);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };


  // 例：APIからデータを取得（DBのREST APIなど）
  useEffect(() => {
    fetchTasks();
    fetchSubTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/fetch?id=${id}`
      );
      console.log("検索ID", id);
      const data = await response.json();

      if (!response.ok || data.length === 0) {
        navigate("/404", { replace: true });
        console.log(response);
        throw new Error("Failed to fetch tasks");
      }
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubTasks = async () => {
    setLoading2(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/subtask/${id}`
      );
      console.log("検索ID", id);
      if (!response.ok) throw new Error("Failed to fetch subtasks");
      const subtaskdata = await response.json();
      setSubTasks(subtaskdata);
    } catch (err) {
      console.error("Failed to fetch subtasks:", err);
    } finally {
      setLoading2(false);
    }
  };

  const handleFormSubmit = (data: UserFormInputs) => {
    // setLoading(true);
    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/search`);
    //   if (!response.ok) throw new Error('Failed to fetch tasks');
    //   const data = await response.json();
    //   setTasks(data);
    // } catch (err) {
    //   console.error('Failed to fetch tasks:', err);
    // } finally {
    //   setLoading(false);
    // //console.log('フォーム送信データ:', data);
    // //alert(`送信成功：${data.name} `);
    // // ここでAPIなどに送信してもOK
  };

  // const handleDueSubmit = (data) => {
  //   console.log('期日送信データ:', data);
  //   alert(`送信成功`);
  // }

  const options = [
    { value: "todo", label: "未完了" },
    { value: "in_progress", label: "進行中" },
    { value: "Done", label: "完了" },
    { value: "", label: "選択を外す" },
  ];

  // const handleSearch = async (params: {
  //   keyword: string;
  //   due_date: string;
  //   status: string;
  // }) => {
  //   console.log("検索条件:", params);
  //   setLoading(true);
  //   try {
  //     const query = new URLSearchParams({
  //       title: params.keyword,
  //       due_date: params.due_date,
  //       status: params.status,
  //     }).toString();

  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}/api/tasks/fetch?${query}`
  //     );

  //     if (!response.ok) throw new Error("Failed to fetch tasks");
  //     const data = await response.json();
  //     setTasks(data); // ← これが App の状態を更新！
  //   } catch (err) {
  //     console.error("Failed to fetch tasks:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // <TaskSearch onSearch={handleSearch} />;

  const handleDelete = async (params: string) => {
    console.log("id:", params);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/${params}}`,
        {
          method: `DELETE`,
        }
      );

      if (!response.ok) throw new Error("Failed to Delete Task");
      // const data = await response.json();
      // setTasks(data); // ← これが App の状態を更新！

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/tasks/fetch`
        );
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // <MyTable tasks={tasks ?? []} loading={loading} onDelete={handleDelete} />;

  const [showModal, setShowModal] = useState(false);
  const ShowModal = () => {
    setShowModal(true);
  };
  const [showSubModal, setShowSubModal] = useState(false);
  const ShowSubModal = () => {
    setShowSubModal(true);
  };

  const handleUpdate = async (params: {
    title: string;
    detail: string;
    due_date: string;
    status: string;
  }) => {
    console.log("params:", params);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/${id}`,
        {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        window.alert("タスクの変更に失敗しました")
        throw new Error("Failed to Update Task");
      }

      // const data = await response.json();
      // setTasks(data); // ← これが App の状態を更新！

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/tasks/fetch?id=${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (params: {
    title: string;
    detail: string;
    status: string;
  }) => {
    console.log("params:", params);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tasks/subtasks/${id}`,
        {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      // うまく行きそうにないなら、reloadで対応予定
      //window.location.reload();

      if (!response.ok) {
        window.alert("サブタスクの作成に失敗しました")
        window.location.reload();
        throw new Error("Failed to Create SubTask");
      }
      // const data = await response.json();
      // setTasks(data); // ← これが App の状態を更新！

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/tasks/subtasks/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch subtasks");
        const data = await response.json();
        setSubTasks(data);
      } catch (err) {
        console.error("Failed to fetch subtasks:", err);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch subtasks:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {tasks && (
        <div>
          <button
            onClick={handleBack}
            className="ml-auto mt-3 mb-3 mr-2 font-bold text-black bg-white border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition"
          >
            ← タスク一覧に戻る
          </button>

          <div className='flex flex-row mb-5 mt-5'>
            <h2 className='text-3xl font-semibold text-gray-800 ml-2'>{tasks[0]?.title || "error"}</h2>
            <button
              onClick={ShowModal}
              className="ml-auto mr-2 font-bold text-black bg-white border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
            >
              ＋ タスク編集
            </button>
          </div>
          {tasks && (
            <TaskModal
              task={tasks ?? []}
              modalbool={showModal}
              setModalbool={setShowModal}
              onCreate={handleUpdate}
            />
          )}
          <TaskDetailBlock tasks={tasks ?? []} loading={loading} onDelete={handleDelete} />
          <br />
          <div className='flex flex-row mb-5 mt-5'>
            <h2 className='text-3xl font-semibold text-gray-800 ml-2'>サブタスク</h2>
            <button
              onClick={ShowSubModal}
              className="ml-auto mr-2 font-bold text-black bg-white border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
            >
              ＋ サブタスク追加
            </button>

          </div>
          {tasks && (
            <CreateSubtaskModal
              modalbool={showSubModal}
              setModalbool={setShowSubModal}
              onCreate={handleCreate}
            />
          )}
          <SubTaskDetailBlock subtasks={subtasks ?? []} loading={loading2} />
        </div>
      )}
    </div>
  );
};

export default App;
