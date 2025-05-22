// src/pages/NotFound.tsx
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-white">
            <h1 className="text-3xl font-bold text-gray-100 mb-4">404 - ページが見つかりません</h1>
            {/* <p className="mb-6">お探しのページは存在しないか、移動された可能性があります。</p> */}
            <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-black text-white rounded border border-white hover:bg-white hover:text-black transition"
            >
                ホームに戻る
            </button>
        </div>
    );
}
