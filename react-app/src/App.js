import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const HELLO = gql`query { hello }`;

function App() {
  const { loading, error, data } = useQuery(HELLO);
  const curData = (data && data.hello) || 'not set'
  const [output, setOutput] = useState("not set");
  if (loading) console.log('loading')
  if (error) console.log('error')
  function callApi() {
    fetch("http://localhost:3001/")
      .then(response => {
        //  const resp = response.json()
        const resp = response.text();
        console.log("resp is ", resp);
        return resp;
      })
      .then(data => {
        console.log(data);
        setOutput(data);
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() => {
            callApi();
          }}
        >
          call api
        </button>
        <div>{output}</div>
        <div>graphql output with data {curData}</div>
      </header>
    </div>
  );
}

export default App;
