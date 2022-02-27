import './App.scss';
import TukanForm from "./views/TukanForm.view";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TukanForm />
      </div>
    </Provider>
  );
}

export default App;
