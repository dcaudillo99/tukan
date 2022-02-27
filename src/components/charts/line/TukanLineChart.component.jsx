import React, {useCallback, useMemo} from 'react'
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {useCurrentPng} from "recharts-to-png";
import FileSaver from "file-saver";

const TukanLineChart = ({ data }) => {
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, `${data.idSerie}-${data.titulo}-line-chart.png`);
    }
  }, [data.idSerie, data.titulo, getPng]);

  return useMemo(() =>
    (
      <div className="py-4">
        <LineChart width={730} height={250} data={data.datos}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }} ref={ref}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name={`${data.idSerie}-${data.titulo}`} type="monotone" dataKey="dato" stroke="#008080" />
        </LineChart>
        <button className="opacity-50 hover:opacity-90 bg-gray-600 rounded-lg p-2 text-white" onClick={handleDownload}>
          {isLoading ? 'Downloading...' : 'Download Chart'}
        </button>
      </div>
    ), [data.datos, data.idSerie, data.titulo, handleDownload, isLoading, ref]
  )
}

export default TukanLineChart;