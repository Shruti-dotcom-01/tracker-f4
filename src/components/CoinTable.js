import React from 'react';

const CoinTable = ({ coins }) => {
  return (
    <table className="coin-table">
     
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id}>
            <td className="img-name-td">
              <img src={coin.image} alt={coin.name} />
            </td>
            <td>{coin.name}</td>
            <td className="symbol">{coin.symbol.toUpperCase()}</td>
            <td>{`$${coin.current_price}`}</td>
            <td>{`$${coin.total_volume.toLocaleString()}`}</td>
            <td>{`$${coin.market_cap.toLocaleString()}`}</td>
            <td
              className={
                coin.price_change_percentage_24h >= 0
                  ? 'market-info'
                  : 'market-info negative-change'
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
