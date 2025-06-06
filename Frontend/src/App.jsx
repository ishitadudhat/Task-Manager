import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import TaskForm from './Pages/TaskForm';
import TaskList from './Pages/TaskList';
import Form from './Pages/Form';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.log('Error in Fetching Tasks: ', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
      <div className="tw-max-w-3xl tw-mx-auto tw-p-4">
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/tasks" element={<TaskList tasks={tasks} onTaskChange={fetchTasks} />} />
          <Route path="/add-task" element={<TaskForm onTaskAdded={fetchTasks} />} />
          <Route path="/users/login" element={<Form/>}/>
          <Route path="/users/register" element={<Form/>}/>
        </Routes>
      </div>
    // </div>
  );
};

export default App;
