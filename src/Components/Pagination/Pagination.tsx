import "./pagination.css";
import { PaginationProp } from "Components/Types";

const Pagination = ({
  totalPages,
  handlePageChange,
  currentPage,
}: PaginationProp) => {
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Pre
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Nex
      </button>
    </div>
  );
};

export default Pagination;
