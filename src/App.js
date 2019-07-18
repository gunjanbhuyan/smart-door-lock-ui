import React, { Component } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <main className="container-fluid">
        <Home />
      </main>
    );
  }
}

export default App;
