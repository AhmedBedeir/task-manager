import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Actions from "./components/Actions";
import Login from "./components/Login";
import "./App.css";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortCategory, setSortCategory] = useState("date");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const tasksPerPage = 3;

  const handleLogin = () => {
    setIsLogin(true);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (category) => {
    setSortCategory(category);
  };

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskToEdit(task);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    setTaskToEdit(null);
  };

  const deleteTask = (taskId, description) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${description}"?`
    );
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };
  // cash the tasks in local storage
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setTasks(tasks);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (!isLogin) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <div className="app">
      <h1>Task Manager</h1>
      <AddTaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        taskToEdit={taskToEdit}
      />
      {loading ? (
        <div className="loading">
          <h2 className="white">Loading...</h2>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onEdit={editTask}
          sortCategory={sortCategory}
          filterCategory={filterCategory}
          currentPage={currentPage}
          tasksPerPage={tasksPerPage}
          onPageChange={onPageChange}
        />
      )}
      <Actions
        sortCategory={sortCategory}
        filterCategory={filterCategory}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
