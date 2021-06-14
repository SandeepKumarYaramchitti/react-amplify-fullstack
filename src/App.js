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
    <div style={styles.container}>
      <h2>My Todos</h2>
      <input style={styles.input}
        value="" 
        placeholder="Name"
      ></input>
      <input style={styles.input}
        value="" 
        placeholder="Description"
      ></input>
      <button style={styles.button}>Create Todo!</button>
    </div>
  );
}

const styles = {
  container: {width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20},
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App;
