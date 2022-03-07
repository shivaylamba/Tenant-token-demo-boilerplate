import React from "react";
import { useSearch } from "../../context/MeiliSearchContext";

function Pagination() {
  const { pagination, updateCurrent } = useSearch();
  let pages = [...Array(Math.ceil(pagination.total / pagination.limit)).keys()];
  console.log({ pagination, pages });
  return (
    <div className="flex justify-center w-full">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          {pages &&
            pages.length > 1 &&
            pages.map((p) => (
              <li className={"page-item"}>
                <button
                  className={
                    "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded focus:shadow-none" +
                    (pagination.current === p + 1
                      ? " bg-blue-600 text-white hover:text-white hover:bg-blue-600"
                      : "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200")
                  }
                  onClick={() => {
                    updateCurrent(p + 1);
                  }}
                >
                  {p + 1}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
