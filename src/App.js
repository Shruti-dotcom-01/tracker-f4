
import React, { useEffect, useState } from 'react';
import CoinTable from './components/CoinTable';
import './App.css'

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  
  // Fetch data using async/await
  const fetchDataAsync = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      const data = await response.json();
      
      // Ensure data is an array before setting it
      if (Array.isArray(data)) {
        setCoins(data);
      } else {
        console.error('Unexpected data format:', data);
        setCoins([]); // Fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCoins([]); // Fallback to empty array in case of error
    }
  };

  useEffect(() => {
    fetchDataAsync(); // Fetching using async/await
  }, []);

  // Filter coins by search term (ensure coins is an array)
  const filteredCoins = Array.isArray(coins)
    ? coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Sorting functions (preserve immutability)
  const sortByMarketCap = () => {
    const sortedCoins = [...coins].sort((a, b) => b.market_cap - a.market_cap);
    setCoins(sortedCoins);
  };

  const sortByPercentageChange = () => {
    const sortedCoins = [...coins].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setCoins(sortedCoins);
  };

  return (
    <div className="App">
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by Name or Symbol"
          value={search} // Controlled input
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={sortByMarketCap}>Sort By Mkt Cap</button>
        <button onClick={sortByPercentageChange}>Sort by Percentage</button>
      </div>
      <CoinTable coins={filteredCoins} />
    </div>
  );
};

export default App;
