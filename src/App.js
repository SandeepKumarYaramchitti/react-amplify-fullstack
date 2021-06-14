import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {createTodo} from './graphql/mutations'
import {getTodo, listTodos} from './graphql/queries'
import awsExports from './aws-exports'
import {withAuthenticator} from '@aws-amplify/ui-react'
Amplify.configure(awsExports)

const initialState = { name: '', description: '' }

function App() {

  const [todos, settodos] = useState([])
  const [formState, setFormState] = useState(initialState)

  useEffect(() => {
    fetchTodos();
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

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
        onChange={event => setInput('name', event.target.value)}
        value={formState.name}
        placeholder="Name"
      ></input>
      <input style={styles.input}
        onChange={event => setInput('description', event.target.value)}
        value={formState.description} 
        placeholder="Description"
      ></input>
      <button style={styles.button}>Create Todo!</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      }
    </div>
  );
}

const styles = {
  container: {width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20},
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
}

const MyTheme = {
  googleSignInButton: { backgroundColor: "red", borderColor: "red" },
  button: { backgroundColor: "green", borderColor: "red" },
  signInButtonIcon: { display: "none" }
};
// @ts-ignore
export default withAuthenticator(App, false, [], null, MyTheme);
