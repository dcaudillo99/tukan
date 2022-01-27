import './App.scss';
import ChatComponent from "./components/chat/Chat.component";
import Login from "./views/auth/Login.view";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUsername} from "./utils/auth";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if(token) setUser(getUsername(token))
    }, [])
  return (
    <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/">
                      <Route path="" element={user ? <ChatComponent/> : <Login />} />
                      <Route path="messages" element={user ? <ChatComponent /> : <Login />} />
                  </Route>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
