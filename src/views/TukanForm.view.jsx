import {useEffect, useState} from "react";
import TukanChartsView from "./charts/TukanCharts.view";
import {useDispatch, useSelector} from "react-redux";
import {getChartList, selectChartStatus, selectChartError ,selectCharts} from "../entities/charts.slice";
import RequestStatus from "../shared/enum/request-status.enum";
import TukanStackChart from "../components/charts/stack/TukanStackChart.component";

const TukanForm = () => {
  const [form, setForm] = useState({token:'', sets:''})
  const [data, setData] = useState(null);
  const error = useSelector(selectChartError);
  const status = useSelector(selectChartStatus);
  const charts = useSelector(selectCharts);
  const dispatch = useDispatch();

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const [token, sets] = evt.target;
    dispatch(getChartList({token, sets}));
  }

  const handleOnFormChange = (evt) => {
    setForm(prevState => ({...prevState, [evt.target.name]:evt.target.value }) )
  }

  useEffect(() => {
    if(RequestStatus.Succeeded === status) {
      setData(charts);
    }
  }, [charts, status])

  return (
    <div className='body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0'>
      <main className="mx-auto w-9/12 p-8 md:p-12 rounded-lg">
        <section>
          <h3 className="flex justify-left font-bold text-2xl">Banxico API visualizer</h3>
          <p className="flex justify-left text-gray-600 pt-2"> Please enter the required fields.</p>
          {error && <p className="flex justify-left text-red-600 pt-2"> {error}</p>}
        </section>

        <section className="my-10">
          <form onSubmit={handleOnSubmit} className="flex flex-col">
            <div className="mb-1 pt-3 rounded bg-gray-200">
              <label className="flex justify-left text-gray-700 text-sm font-bold mb-2 ml-3">Token</label>
              <input name="token" value={form.token} onChange={handleOnFormChange} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3" type="text"/>
            </div>
            <div className={'flex justify-left text-gray-700 text-sm mb-6'}>
              <p>
                You need a Banxico token. You can find it on
                <a className={'text-blue-500 hover:underline'} href={'https://www.banxico.org.mx/SieAPIRest/service/v1/token'}> https://www.banxico.org.mx/SieAPIRest/service/v1/token</a>
              </p>
            </div>
            <div className="mb-1 pt-3 rounded bg-gray-200">
              <label className="flex justify-left text-gray-700 text-sm font-bold mb-2 ml-3">Sets</label>
              <input name="sets" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3" type="text"/>
            </div>
            <div className={'flex justify-left text-gray-700 text-sm mb-6'}>
              <p>
                Example: SF61745,SP68257
              </p>
            </div>
            <button disabled={form.token === ''}  className={`${form.token === '' ? 'opacity-40' :' hover:bg-teal-700 font-bold'} 
              bg-teal-600 text-white py-2 rounded shadow-lg hover:shadow-xl transition duration-200 md:w-1/4 w-1/2 `}>
              {status === RequestStatus.Loading ? 'Loading...' : 'Fetch'}
            </button>
          </form>
        </section>
        {data && <TukanStackChart series={data}/>}
        <section className="mt-10">
          {
            data && data.map( (_serie) => <TukanChartsView key={_serie.idSerie} serie={_serie} /> )
          }
        </section>
      </main>
    </div>
  )
}

export default TukanForm;