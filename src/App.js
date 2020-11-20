import React from "react";
//import Login from "./components/Login";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/chat/:chatId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
