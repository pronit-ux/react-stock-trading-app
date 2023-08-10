import React from "react";
import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";

const StockOverviewPage = () => {
  return (
    <div>
      <div className="icon">
        <img src="/exchange-rate.png" alt="icon" width={80} />
        <h3>Trading App</h3>
      </div>
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
