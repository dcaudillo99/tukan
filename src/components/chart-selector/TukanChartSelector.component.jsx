import TukanBarChart from "../charts/bar/TukanBarChart.component";
import TukanLineChart from "../charts/line/TukanLineChart.component";
import {useEffect, useState} from "react";
import TukanTableChart from "../charts/table/TukanTableChart.component";

const TukanChartSelector = ({ type, serie }) => {
  const [data, setData] = useState(serie);

  useEffect(() => {
    setData(serie)
  }, [serie])

  if (type === 'BAR') return <TukanBarChart data={data} />
  if (type === 'LINE') return <TukanLineChart data={data} />
  if (type === 'TABLE') return <TukanTableChart data={data} />
}

export default TukanChartSelector;