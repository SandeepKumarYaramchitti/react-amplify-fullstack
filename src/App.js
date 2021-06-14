import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {createTodo} from './graphql/mutations'
import {getTodo, listTodos} from './graphql/queries'
import awsExports from './aws-exports'
Amplify.configure(awsExports)


function App() {

  const [todos, settodos] = useState([])

  useEffect(() => {
    fetchTodos();
  }, [])

  async function fetchTodos() {
      try {
          const toDoData = await API.graphql(graphqlOperation(listTodos));
          // @ts-ignore
          const todos = toDoData.data.listTodos.items;
          settodos(todos);

      }catch (err) {

      }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
