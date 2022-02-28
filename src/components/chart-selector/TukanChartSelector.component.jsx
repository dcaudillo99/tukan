import TukanBarChart from "../charts/bar/TukanBarChart.component";
import TukanLineChart from "../charts/line/TukanLineChart.component";
import {useEffect, useState} from "react";

const TukanChartSelector = ({ type, serie }) => {
  const [data, setData] = useState(serie);

  useEffect(() => {
    setData(serie)
  }, [serie])

  if (type === 'BAR') return <TukanBarChart serie={data} />
  if (type === 'LINE') return <TukanLineChart serie={data} />
}

export default TukanChartSelector;