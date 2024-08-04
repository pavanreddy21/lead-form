export default function Pagination({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-end items-center p-4 space-x-2">
      <button
        className={`text-gray-500 hover:text-gray-700 ${
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
      >
        {"<"}
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-3 py-1 ${
            currentPage === index + 1
              ? "text-black font-semibold"
              : "text-gray-500 hover:text-black"
          } border rounded-md`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`text-gray-500 hover:text-gray-700 ${
          (totalPages == 0 || currentPage === totalPages) &&
          "opacity-50 cursor-not-allowed"
        }`}
        onClick={() =>
          currentPage < totalPages && setCurrentPage(currentPage + 1)
        }
      >
        {">"}
      </button>
    </div>
  );
}
