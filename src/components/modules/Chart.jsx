import { useState } from "react";
import styles from "./Chart.module.css";
import { convertData } from "../../helpers/convertData";
import ChartComponent from "./ChartComponent";
const Chart = ({ chart, setChart }) => {
  const [type, setType] = useState("prices");
  const typeHandler = (e) => {
    if(e.target.tagName ==="BUTTON"){
        const type=e.target.innerText.toLowerCase().replace(" ","_")
        setType(type)
    }
  }
  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt={chart.coin.name} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type==="prices"? styles.selected : null}>Prices</button>
          <button className={type==="market_caps"? styles.selected : null}>Market Caps</button>
          <button className={type==="total_volumes"? styles.selected : null}>Total Volumes</button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Price :</p>
            <span>{chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH : </p>
            <span>{chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap :</p>
            <span>{chart.coin.market_cap.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
