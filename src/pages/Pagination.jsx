import { useState } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const [jumpPage, setJumpPage] = useState("");

  const handleJump = () => {
    const page = Number(jumpPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page - 1); // backend is 0-indexed
      setJumpPage("");
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const windowSize = 2; // show 2 pages before/after current

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > windowSize + 2) pages.push("...");

      for (
        let i = Math.max(2, currentPage - windowSize + 1);
        i <= Math.min(totalPages - 1, currentPage + windowSize + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - windowSize - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between gap-4 mt-6">
      {/* Page Numbers */}
      <div className="flex gap-2 flex-wrap">
        {generatePageNumbers().map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-2 text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p - 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage + 1 === p
                  ? "bg-yellow-500 text-black font-semibold"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Jump to page */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          className="w-20 px-2 py-1 bg-gray-900 border border-gray-700 text-gray-200 rounded-md"
          placeholder="Page"
        />
        <button
          onClick={handleJump}
          className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-400"
        >
          Go
        </button>
      </div>
    </div>
  );
}
