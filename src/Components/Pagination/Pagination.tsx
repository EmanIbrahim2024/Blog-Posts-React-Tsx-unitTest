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
        title="previous posts"
        aria-label="previous page"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
          aria-current={currentPage === i + 1 ? "page" : undefined}
        >
          {i + 1}
        </button>
      ))}

      <button
        title="show next posts"
        aria-label="Next page"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
