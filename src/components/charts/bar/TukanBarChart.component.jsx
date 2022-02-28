import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useRef} from "react";

const TukanBarChart = ({serie}) => {
  const chartRef = useRef(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };

  const data = {
    labels: serie.datos.map((_data) => _data.fecha),
    datasets: [
      {
        label: serie.titulo,
        data: serie.datos.map((_data) => _data.dato),
        borderColor: `rgb(0,128,128)`,
        backgroundColor: `rgba(0,128,128, 1)`,
      }
    ]
  };

  const handleDownloadChart = () => {
    const base64Image = chartRef.current.toBase64Image();
    const a = document.createElement('a');
    a.href = base64Image;
    a.download = `${serie.idSerie}-${serie.titulo}-bar-chart`;
    a.click();
  }

  return (
    <>
      <Bar options={options} data={data} ref={chartRef} />
      <button className="opacity-50 hover:opacity-90 bg-slate-600 rounded-md p-2 text-white my-2" onClick={handleDownloadChart}>Download</button>
    </>
  )
}

export default TukanBarChart;