"use client";

export default function Home() {
  const handleRaiseGate = () => {
    alert("踏切を上げる");
  };

  const handleLowerGate = () => {
    alert("踏切を下げる");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-2xl font-bold">踏切制御アプリ</h1>
      <div className="flex gap-4">
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleRaiseGate}
        >
          A: 踏切を上げる
        </button>
        <button
          className="px-6 py-3 text-white bg-red-500 rounded-md hover:bg-red-600"
          onClick={handleLowerGate}
        >
          B: 踏切を下げる
        </button>
      </div>
    </div>
  );
}
