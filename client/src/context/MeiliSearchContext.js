import React, { createContext, useContext, useEffect, useState } from "react";
import { MeiliSearch } from "meilisearch";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}
const PAGE_LIMIT = 20;

export function MeiliSearchProvider({ children }) {
  const [result, setResult] = useState();
  const [searchText, setSearchText] = useState();
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_MEILI_API_KEY);
  const [pagination, setPagination] = useState({
    limit: PAGE_LIMIT,
    current: 1,
    total: 0,
  });

  //possible values: null,true,false
  const [isAppointed, setIsAppointed] = useState(null);

  useEffect(() => {
    search({ query: searchText, current: 1, isAppointed });
    setPagination({ ...pagination, current: 1 });

    // eslint-disable-next-line
  }, [searchText, apiKey, isAppointed]);

  useEffect(() => {
    if (result) {
      setPagination((p) => ({
        ...p,
        total: result.nbHits || 0,
      }));
    }
  }, [result]);

  async function search({
    query,
    limit = pagination.limit,
    current = pagination.current,
    isAppointed,
  }) {
    setResult();
    const client = new MeiliSearch({
      host: process.env.REACT_APP_MEILI_HOST,
      apiKey: apiKey,
    });

    const offset = (current - 1) * pagination.limit;

    const index = client.index(process.env.REACT_APP_MEILI_INDEX);
    let filter = [];
    if (isAppointed != null) {
      filter.push(`isDoctorAppointed=${isAppointed}`)
    }
    return index
      .search(query, {
        limit,
        offset,
        filter
      })
      .then((results) => {
        setResult(results);
      })
      .catch((err) => {
        console.log("err", err);
        setResult({ hits: [] });
        alert(err.message);
      });
  }

  function updateCurrent(current) {
    if (current === pagination.current) return;

    let newPaginationObj = { ...pagination, current };
    setPagination(newPaginationObj);
    search({
      query: searchText,
      current,
      isAppointed,
    });
  }

  return (
    <SearchContext.Provider
      value={{
        data: result,
        search,
        searchText,
        setSearchText,
        setApiKey,
        pagination,
        updateCurrent,
        isAppointed,
        setIsAppointed
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
