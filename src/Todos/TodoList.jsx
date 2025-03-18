import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading,setLoading]=useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: "GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        }).then((response) => response.json()).then((data)=>{
            console.log(data)
            setTodos(data)
        }).finally(()=>setLoading(false));
    }, []);
  return (
    <>
        <div  className='flex justify-between items-center mx-auto mt-3 max-w-2xl'>
            <h1 className='font-bold text-xl'>All Todos</h1>
            <button className='bg-green-700 hover:bg-green-800 dark:bg-pink-900-600 dark:hover:bg-green-700 mr-2 mb-2 px-5 py-2.5 rounded-full focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 font-medium text-white text-sm text-center' onClick={() => {navigate('/create-todo')}}>Create New Todo</button>
        </div>
        <ul className='bg-blue-50 shadow-lg m-4 mx-auto p-4 rounded-lg max-w-2xl text-black todo-list'>
            {
                loading ?
                    <div className="flex justify-center">
                        <Loader size={36} />
                    </div>

                : todos.map(todo=>(
                    <Todo key={todo.id} todo={todo} />
                ))
            }
        </ul>
    </>
  )
}

export default TodoList