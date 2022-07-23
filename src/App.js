import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className = 'title'>
        <span className = 'c'>C</span>rypt<span className = 'w'>W</span>atch
      </div>
      <div className='coin-search'>
        {
          /*<h1 className='coin-text'>Search a currency</h1>*/
        }
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search a currency'
          />
        </form>
      </div>
      <span className = 'tags'>
      <span className = 'cryptoname'>CryptoName</span>
      <span className = 'cryptosymbol'>Symbol</span>
      <span className = 'currentprice'>CurrentPrice</span>
      <span className = 'marketcap'>Market Cap</span>
      <span className = 'pricechaange'>Percentage (24h)</span>
      <span className = 'totalvolume'>Total Volume</span>
      </span>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
