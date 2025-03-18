import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

    const addTodo = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Please enter a valid todo");
            return;
        }

        if (id) {
            updateTodo();
            return;
        }

        setLoading(true);

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 1,
                title: title,
                completed: false,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTitle("");
                toast.success("Todo Created Successfully");
                navigate('/');
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (id) {
            setLoading(true)
            fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setCompleted(data.completed);
                })
                .finally(() => setLoading(false))
        }
    }, [id]);

    const updateTodo = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 1,
                    title: title,
                    completed: completed,
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTitle("");
                toast.success("Todo Updated Successfully");
                navigate("/")
            })
    }

    return (
        <>
            <div className='flex flex-col justify-between items-center gap-4 bg-blue-200 mx-auto mt-5 p-4 max-w-2xl'>
                {
                    loading ?
                        <Loader /> :
                        <input type="text" className='mr-2 p-2 border border-gray-600 rounded-lg w-full' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Enter Todo' />
                }
                <button className='bg-pink-400 px-3 py-2 rounded-md text-black' disabled={loading} onClick={addTodo}>{id != null ? "Update" : "Create"}</button>
            </div>
        </>
    )
}

export default CreateTodo