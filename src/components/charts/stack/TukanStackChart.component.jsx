import TukanLineChart from "../line/TukanLineChart.component";

const TukanStackChart = ({ data }) => {
  console.log(data);
  return(<TukanLineChart data={data} />)
}

export default TukanStackChart;