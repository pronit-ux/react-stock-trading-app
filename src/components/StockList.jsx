import React, { useContext, useEffect, useState } from "react";
import finHub from "../apis/finHub";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

const StockList = () => {
  const [stock, setStock] = useState([]);
  const { watchList, deleteStock } = useContext(WatchListContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = Promise.all(
          watchList.map((stock) => {
            return finHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        console.log(responses);
        const data = (await responses).map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(80%, 90%, 105%)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
                className="table-row"
                key={stockData.symbol}
              >
                <th scope="row">{stockData.symbol}</th>
                <td> {stockData.data.c} </td>
                <td
                  className={`text-${
                    stockData.data.d < 0 ? "danger" : "success"
                  }`}
                >
                  {stockData.data.d}
                  {stockData.data.d < 0 ? (
                    <BsFillCaretDownFill />
                  ) : (
                    <BsFillCaretUpFill />
                  )}
                </td>
                <td
                  className={`text-${
                    stockData.data.dp < 0 ? "danger" : "success"
                  }`}
                >
                  {stockData.data.dp}{" "}
                  {stockData.data.dp < 0 ? (
                    <BsFillCaretDownFill />
                  ) : (
                    <BsFillCaretUpFill />
                  )}
                </td>
                <td> {stockData.data.h} </td>
                <td> {stockData.data.l} </td>
                <td> {stockData.data.o} </td>
                <td>
                  {stockData.data.pc}{" "}
                  <button
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStock(stockData.symbol);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
