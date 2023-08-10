import React, { useContext, useEffect, useState } from "react";
import finHub from "../apis/finHub";
import { WatchListContext } from "../context/watchListContext";

const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { addStock } = useContext(WatchListContext);

  const renderDropDown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "400px",
          width: "290px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          return (
            <li
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
              key={result.symbol}
              className="dropdown-item"
            >
              {result.description} {result.symbol}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finHub.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(response.data.result);
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          type="text"
          placeholder="Search"
          id="search"
          style={{ backgroundColor: "rgba(145%, 160%, 175%, 0.05)" }}
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
        />
        <label htmlFor="search">Search</label>
        {renderDropDown()}
      </div>
    </div>
  );
};

export default AutoComplete;
