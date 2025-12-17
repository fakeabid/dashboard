import { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import clsx from 'clsx'

export default function TodoWidget () {
    const [todos, setTodos] = useState([
    ])
    console.log(todos)

    const isFirstRender = useRef(true);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const todoElements = todos.map((todo) => {
        const todoClassName = clsx({
            done: todo.done
        })

        return (
            <li key={todo.id} className={todoClassName} onClick={() => toggleTodo(todo.id)}>
                <button onClick={(e) => {
                    e.stopPropagation();
                    clearTodo(todo.id)
                }}>
                    -
                </button>
                <span>{todo.text}</span>
            </li>
        )
    })

    function addTodo (formData) {
        const raw = formData.get("todo");
        const text = raw?.trim();
        if (!text) return;

        setTodos((prevTodos) => (
            [
                ...prevTodos,
                {
                    id: nanoid(),
                    text: text,
                    done: false
                }
            ].sort((a, b) => a.done - b.done)
        ))
    }

    function toggleTodo(id) {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => (
                todo.id === id ? { ...todo, done: !todo.done} : todo
            )).sort((a, b) => a.done - b.done)
        ))
    }

    function clearTodo(id) {
        setTodos((prevTodos) => (
            prevTodos.filter(todo => todo.id !== id).sort((a, b) => a.done - b.done)
        ))
    }

    function clearTodos() {
        setTodos([])
    }

    return (
        <div className='todo-card card'>
            <h4>To-do</h4>
            <button className='clear-btn' onClick={clearTodos}><i className="bi bi-trash"></i></button>
            <ul>
                {todoElements}
            </ul>
            <form className='add-todo-form' action={addTodo}>
                <input type='text' name='todo' aria-label='add new todo' placeholder='eg: water plants'/>
                <button type='submit' aria-label='add todo button'>+</button>
            </form>
        </div>
    )
}