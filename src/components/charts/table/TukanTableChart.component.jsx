import React, {useCallback, useMemo} from "react"
import {Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";

const TukanBarChart = ({data}) => {
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, `${data.idSerie}-${data.titulo}-table-chart.png`);
    }
  }, [data.idSerie, data.titulo, getPng]);

  return useMemo(() =>
    (
      <div className="py-4">
        <AreaChart width={730} height={250} data={data.datos}
                   margin={{ top: 10, right: 30, left: 0, bottom: 0 }} ref={ref}>
          <defs>
            <linearGradient id="colorDato" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#008080" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#008080" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="fecha" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Area name={`${data.idSerie}-${data.titulo}`} type="monotone" dataKey="dato" stroke="#008080" fillOpacity={1} fill="url(#colorDato)" />
        </AreaChart>
        <button className="opacity-50 hover:opacity-90 bg-gray-600 rounded-lg p-2 text-white" onClick={handleDownload}>
          {isLoading ? 'Downloading...' : 'Download Chart'}
        </button>
      </div>
    ),[data.datos, data.idSerie, data.titulo, handleDownload, isLoading, ref]
  )
}

export default TukanBarChart;