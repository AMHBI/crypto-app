import { useEffect, useState } from "react";
import CoinsTable from "../modules/CoinsTable";
import { getCoinList } from "../../services/cryptoAPIs";

const HomePage = () => {
    const [coins,setCoins] = useState([])
    const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinList())
      const json = await res.json()
      setCoins(json)
      setIsLoading(false)
    }
    getData()
  }, []);
  console.log(coins);
  return <div>
    <CoinsTable  coins={coins} isLoading={isLoading}/>
  </div>;
};

export default HomePage;
