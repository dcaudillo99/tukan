import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useRef} from "react";

const TukanStackChart = ({series}) => {
  const chartRef = useRef(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  function randomRGBA() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grouped Data',
      },
    },
  };

  const dataLength = series.map((_data) =>_data.datos.length);
  const maxLength = Math.max(...dataLength);
  const [baseLabels] = series.filter((_serie) => _serie.datos.length === maxLength)

  const data = {
    labels: baseLabels.datos.map((_data) => _data.fecha),
    datasets: series.map( (_serie) => {
      const color = randomRGBA()
      return(
        {
          label: _serie.titulo,
          data: _serie.datos.map((_data) => _data.dato),
          borderColor: color,
          backgroundColor: color,
        }
      )
    })
  };

  const handleDownloadChart = () => {
    const base64Image = chartRef.current.toBase64Image();
    const a = document.createElement('a');
    a.href = base64Image;
    a.download = `stacked-chart`;
    a.click();
  }

  return(
    <>
      <Line options={options} data={data} ref={chartRef}/>
      <button className="opacity-50 hover:opacity-90 bg-slate-600 rounded-md p-2 text-white mt-2" onClick={handleDownloadChart}>Download</button>
    </>
  )
}

export default TukanStackChart;