import React from "react";
import "./pagination.css";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pageSize === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  // Determine the range of pages to display
  const pageRangeStart = (Math.ceil(currentPage / 10) - 1) * 10 + 1;
  const pageRangeEnd = Math.min(pageRangeStart + 9, pagesCount);

  return (
    <div>
      <ul className="pagination">
        <li>
          <a className="pageLink" onClick={handlePreviousPage}>
            Previous
          </a>
        </li>
        {pages.slice(pageRangeStart - 1, pageRangeEnd).map((page) => (
          <li
            key={page}
            className={page === currentPage ? "pageItemActive" : "pageItem"}
          >
            <a className="pageLink" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li>
          <a className="pageLink" onClick={handleNextPage}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
