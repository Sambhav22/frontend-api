import React, { Component } from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from "./components/Home"
import Navbar from './components/Navbar';
import AddInterview from "./components/AddInterview";
import EditInterview from "./components/EditInterview";

class App extends Component {

  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home}></Route>
        <Route path="/addinterview" component={AddInterview}></Route>
        <Route path="/editinterview/:id/:name1/:name2/:start/:end" component={EditInterview}></Route>

      </Router>
    )
  }
}

export default App;