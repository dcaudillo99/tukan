import TukanButton from "../../components/buttons/TukanButton.component";
import {useEffect, useState} from "react";
import TukanChartSelector from "../../components/chart-selector/TukanChartSelector.component";

const TukanCharts = ({otherProps, serie }) => {
  const [data, setData] = useState(serie);
  const CHART_TYPES = ['BAR', 'LINE'];
  const [chartType, setChartType] = useState(CHART_TYPES[0]);

  const handleOnSetChartType = (evt) => {
    setChartType(evt.target.value)
  }

  useEffect(() => {
    setData(serie)
  }, [serie])

  return (
    <div {...otherProps} className="bg-gray-100 rounded-md mb-8">
      <div className="flex justify-center space-x-4 py-4">
        {
          CHART_TYPES.map( (_type) =>
            <TukanButton key={_type} otherProps={{ onClick:handleOnSetChartType, value: _type}} label={_type} />
          )
        }
      </div>
      {
        serie && <TukanChartSelector type={chartType} serie={data} />
      }
    </div>
  )
}

export default TukanCharts;