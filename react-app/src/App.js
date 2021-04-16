import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const HELLO = gql`query { 
  hello 
  roll(numDice: 12, numSides: 15)
  random
  quoteOfTheDay
}`;

function App() {
  const { loading, error, data } = useQuery(HELLO);
  const curData = (data && data.hello) || 'not set'
  const qod = (data && data.quoteOfTheDay) || 'not set'
  const rn = (data && data.random) || 'not set'
  const [output, setOutput] = useState("not set");

  function threeDice() {
    if (!data) return

    const {roll} = data
    if (!roll) return

    return roll.map((dice, idx) => (<li key={idx}>{dice}</li>))
  }

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
        <ol>three dice {threeDice()}</ol>
        <div>today's quote: {qod}</div>
        <div>random number: {rn}</div>
      </header>
    </div>
  );
}

export default App;
