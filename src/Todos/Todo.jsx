import { Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Todo = ({todo}) => {
    const navigate = useNavigate();

    const editTodo = () => {
        navigate(`/todos/${todo.id}`);
    };

    const deleteTodo = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,{
            method:"DELETE"
        }).then(() => {
            toast.success("Todo deleted successfully");
            navigate("/");
        })
    };

  return (
    <>
        <div className={`flex justify-between items-center ${todo.completed ? "bg-green-200 border-green-400": "bg-pink-200 border-pink-400"}  m-2 p-4 border rounded-lg text-black card todo`}>
            <p className={`${todo.completed ? "line-through" : ""}`}>{todo.title}</p>
            <div className='flex gap-2'>
            <button className='bg-yellow-400 px-3 py-2 cursor-pointer' onClick={editTodo}><Pencil /></button>
            <button className='bg-red-500 px-3 py-2 cursor-pointer' onClick={() => deleteTodo(todo.id)}><Trash2 /></button>
            </div>
        </div>
    </>
  )
}

export default Todo