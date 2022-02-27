import React, {useMemo} from "react"
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import {useCallback} from "react";

const TukanBarChart = ({data}) => {
  const [getPng, { ref, isLoading }] = useCurrentPng();

  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      // Download with FileSaver
      FileSaver.saveAs(png, `${data.idSerie}-${data.titulo}-bar-chart.png`);
    }
  }, [data.idSerie, data.titulo, getPng]);

  return useMemo(() => (
    <div className="py-4">
      <BarChart barGap={8} width={730} height={250} data={data.datos} ref={ref}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name={`${data.idSerie}-${data.titulo}`} dataKey="dato" fill="#008080" />
      </BarChart>
      <button className="opacity-50 hover:opacity-90 bg-gray-600 rounded-lg p-2 text-white" onClick={handleDownload}>
        {isLoading ? 'Downloading...' : 'Download Chart'}
      </button>
    </div>
  ), [data.datos, data.idSerie, data.titulo, handleDownload, isLoading, ref])
}

export default TukanBarChart;