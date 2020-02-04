import React from 'react';
import './App.css';
import PriceFeeds from "./components/PriceFeeds";
import AddPriceFeed from "./components/AddPriceFeed";

function App() {
  return (
    <div className="App">
      <PriceFeeds/>
      <AddPriceFeed/>
    </div>
  );
}

export default App;
