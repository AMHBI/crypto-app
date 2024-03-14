import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoAPIs";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Search.module.css";
const Search = ({ currency, setCurrency }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          console.log(json.coins);
          setIsLoading(false);
          setCoins(json.coins);
        } else {
          alert(json.status.error_message || "An error occurred");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    search();
    return () => controller.abort();
  }, [text]);
  return (
    <div className={styles.searchBox}>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select name={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value='usd'>USD</option>
        <option value='eur'>EUR</option>
        <option value='jpy'>JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className={styles.searchResult}>
          {isLoading ? (
            <RotatingLines width='50px' strokeColor='#fff' />
          ) : (
            <ul>
              {coins.map((coin) => (
                <li key={coin.id}>
                  <img src={coin.thumb} alt={coin?.name} />
                  <span>{coin.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
