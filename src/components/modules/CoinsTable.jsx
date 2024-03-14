import chartup from "../../assets/chart-up.svg";
import chartdown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import styles from "./CoinsTable.module.css";

const CoinsTable = ({ coins, isLoading }) => {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor='#3874ff' />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H</th>
              <th>Total volume</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => (
              <TableRow coin={coin} key={coin.id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoinsTable;

const TableRow = ({
  coin: {
    name,
    image,
    current_price,
    symbol,
    price_change_percentage_24h: price_change,
    total_volume,
  },
}) => {
  return (
    <tr>
      <td>
        <div className={styles.symbol}>
          <img src={image} alt={name} width={40} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {current_price > 1 ? current_price.toLocaleString() : current_price} $
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)} %
      </td>
      <td>
        <img src={price_change > 0 ? chartup : chartdown} alt={name} />
      </td>
    </tr>
  );
};
