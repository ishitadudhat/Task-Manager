import React, { useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm'; // Make sure TaskForm is imported

const TaskList = ({ tasks, onTaskChange }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/tasks/${id}`, {
        status: !currentStatus
      });
      onTaskChange();
    } catch (error) {
      console.error('Error in toggling task status:', error);
    }
  };

  const deleteTask = async (id) => {
  console.log("Trying to delete task:", id);
  try {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/tasks/${id}`);
    console.log("Delete response:", res.data);
    onTaskChange();
  } catch (error) {
    console.error('Error in deleting task:', error.response ? error.response.data : error.message);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <div className="w-full md:w-3/4 lg:w-1/2">

        <h2 className="text-center text-3xl font-bold text-purple-900 mb-6">📋 Task List</h2>

        {/* Add Task Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="tw-bg-gradient-to-r tw-from-purple-600 tw-to-indigo-700 tw-text-white tw-px-6 tw-py-2 tw-rounded-xl tw-shadow-lg hover:tw-from-purple-700 hover:tw-to-indigo-800 transition"
          >
            {showForm ? 'Close ✖️' : '➕ Add Task'}
          </button>
        </div>

        {/* Show TaskForm inline when toggled */}
        {showForm && (
          <div className="tw-mb-6">
            <TaskForm onTaskAdded={() => { onTaskChange(); setShowForm(false); }} />
          </div>
        )}

        {/* Task list */}
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-4 mb-6 flex items-center justify-between hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={Boolean(task.status)}
                onChange={() => toggleStatus(task._id, task.status)}
                className="w-5 h-5 accent-purple-700"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            </div>

            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-300 rounded-md px-2 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
