import { useEffect, useState } from "react";
import TaskDetailBlock from "./TaskDetailBlock.tsx"; // 下で定義するテーブル表示コンポーネント
import SubTaskDetailBlock from "./SubTaskDetailBlock.tsx"; // 下で定義するテーブル表示コンポーネント
import { Task, SubTask } from "../types.ts";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleBack = () => {
    if (tasks[0]?.visibility == "ARCHIVED") {
      navigate("/archived");
    }
    else {
      navigate("/");
    }
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
      const data = await response.json();
      if (!response.ok || data.length === 0) {
        navigate("/404", { replace: true });
        console.log(response);
        throw new Error("Failed to fetch tasks");
      }
      setTasks(data);
      if (data[0]?.visibility === "ARCHIVED") {
        setShowModal(false);
        setShowSubModal(false);
      }
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
      if (!response.ok) throw new Error("Failed to fetch subtasks");
      const subtaskdata = await response.json();
      setSubTasks(subtaskdata);
    } catch (err) {
      console.error("Failed to fetch subtasks:", err);
    } finally {
      setLoading2(false);
    }
  };

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

  const [showModal, setShowModal] = useState(false);
  const ShowModal = () => {
    setShowModal(true);
    if (tasks[0]?.visibility === "ARCHIVED") {
      setShowModal(false);
    }
  };
  const [showSubModal, setShowSubModal] = useState(false);
  const ShowSubModal = () => {
    setShowSubModal(true);
    if (tasks[0]?.visibility === "ARCHIVED") {
      setShowSubModal(false);
    }
  };

  const handleUpdate = async (params: {
    title: string;
    detail: string;
    due_date: string;
    status: string;
  }) => {
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
      window.location.reload();
      if (!response.ok) {
        window.alert("サブタスクの作成に失敗しました")
        window.location.reload();
        throw new Error("Failed to Create SubTask");
      }
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
            ← 一覧に戻る
          </button>
          <div className='flex flex-row mb-5 mt-5'>
            <h2 className='text-3xl font-semibold text-gray-800 ml-2'>{tasks[0]?.title || "error"}</h2>
            {tasks[0]?.visibility !== "ARCHIVED" && (
              <button
                onClick={ShowModal}
                className="ml-auto mr-2 font-bold text-black bg-white border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
              >
                ＋ タスク編集
              </button>
            )}

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
            {tasks[0]?.visibility !== "ARCHIVED" && (
              <button
                onClick={ShowSubModal}
                className="ml-auto mr-2 font-bold text-black bg-white border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
              >
                ＋ サブタスク追加
              </button>
            )}
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
