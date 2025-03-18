import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TodoList from './Todos/TodoList';
import CreateTodo from './Todos/CreateTodo';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path='/create-todo' element={<CreateTodo />} />
          <Route path="/todos/:id" element={<CreateTodo />} />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  )
}

export default App
