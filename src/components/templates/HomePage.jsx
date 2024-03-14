import { useEffect, useState } from "react";
import CoinsTable from "../modules/CoinsTable";
import { getCoinList } from "../../services/cryptoAPIs";
import Pagination from "../modules/Pagination";

const HomePage = () => {
    const [coins,setCoins] = useState([])
    const [isLoading,setIsLoading] = useState(true)
  const [page, setPage] = useState(1);

  useEffect(() => {
    
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch(getCoinList(page))
      const json = await res.json()
      setCoins(json)
      setIsLoading(false)
    }
    getData()
  }, [page]);
  console.log(coins);
  return <div>
    <Pagination  page={page} setPage={setPage} />
    <CoinsTable  coins={coins} isLoading={isLoading}/>
  </div>;
};

export default HomePage;
