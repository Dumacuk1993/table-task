import React from "react";
import "./Pagination.css";

const Pagination = ({ pagination, changePage }) => {
  const pagesArr = [];

  for (let i = 1; i <= pagination.allPages; i++) {
    pagesArr.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pagesArr.map((page) => {
          return (
            <li
              key={page}
              className={
                pagination.currentPage === page
                  ? "page-item active "
                  : "page-item"
              }
              onClick={() => changePage(page)}
            >
              <span className="page-link">{page}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
