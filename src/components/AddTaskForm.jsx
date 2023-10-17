import { useState, useEffect } from "react";

const AddTaskForm = ({ onAdd, onUpdate, taskToEdit }) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("not-started");

  // Effect to initialize form values when editing a task
  useEffect(() => {
    if (taskToEdit) {
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      onUpdate({ id: taskToEdit.id, description, status });
    } else {
      onAdd({ description, status, id: Date.now() });
    }
    setDescription("");
    setStatus("not-started");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-heading">
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default AddTaskForm;
