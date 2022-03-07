import React from "react";
import { useSearch } from "../../context/MeiliSearchContext";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";

function Result() {
  const { data } = useSearch();
  return (
    <div className="px-5 m-4">
      <div className="inline-block w-full md:w-1/4 lg:w-1/5 mb-4">
        <Filters />
      </div>
      <div className="inline-block w-full md:w-3/4 lg:w-4/5">
        <p className="my-3 pl-8 text-gray-500">Search Results:</p>
        {data ? (
          data.hits.length > 0 ? (
            <div>
              <div className="flex justify-center flex-wrap">
                {data.hits.map((i, index) => (
                  <Card data={i} key={`data-${i.id}-${index}`} />
                ))}
                <Pagination />
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Data for the user does not exist
            </p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div>
      <svg
        version="1.1"
        id="L9"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        width={50}
        height={50}
        style={{ background: "transparent", margin: "auto" }}
      >
        <path
          fill="#ff537c"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
export default Result;
