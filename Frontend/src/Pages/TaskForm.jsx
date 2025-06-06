import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/tasks`, {
        title,
        description,
      });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error('Error in adding task:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-6 max-w-full"
    >
      <h3 className="text-xl font-semibold text-purple-800 mb-4">➕ Add New Task</h3>

      <input    
        type="text"
        placeholder="Task title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold py-2 rounded-lg shadow hover:from-purple-700 hover:to-indigo-800 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
