import React, { useEffect, useState } from 'react';
import { MdAutoDelete, MdCheck } from "react-icons/md";
import { FaSkullCrossbones } from "react-icons/fa";
import "./Todo.css";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [timeDate, setTimeDate] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    if (tasks.some(task => task.text === inputValue)) {
      setInputValue('');
      return;
    }
    setTasks((prev) => [...prev, { text: inputValue, checked: false }]);
    setInputValue('');
  };

  // time and date functionality....
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const formatDate = today.toLocaleDateString();
      const formatTime = today.toLocaleTimeString();
      setTimeDate(`${formatDate} - ${formatTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // delete task button
  const handleDelete = (curTask) => {
    const updatedTasks = tasks.filter((task) => task.text !== curTask.text);
    setTasks(updatedTasks);
  };

  // toggle check button
  const handleToggleCheck = (curTask) => {
    const updatedTasks = tasks.map((task) =>
      task.text === curTask.text ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
  };

  // clear all tasks button
  const handleClear = () => {
    setTasks([]);
  };

  return (
    <div className='todo-container'>
      <section>
        <h1>Todo List</h1>
        <h2 className='date-time'>{timeDate}</h2>
      </section>
      <section>
        <form onSubmit={handleForm}>
          <div>
            <input
              type="text"
              className='todo-input'
              autoComplete='off'
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button type='submit' className='todo-btn'>Add Task</button>
          </div>
        </form>
        <section className='myUnOrdList'>
          <ul>
            {tasks.map((curTask, index) => (
              <li key={index} className={`todo-item ${curTask.checked ? "checked" : ""}`}>
                <span>{curTask.text}</span>
                <button className='check-btn' onClick={() => handleToggleCheck(curTask)}>
                  {curTask.checked ? <MdCheck /> : <FaSkullCrossbones/>}
                </button>
                <button className='delete-btn' onClick={() => handleDelete(curTask)}>
                  <MdAutoDelete />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <section>
        <button className='clear-btn' onClick={handleClear}>Clear all</button>
      </section>
    </div>
  );
}

export default Todo;
