const Task = ({ task, onDelete, onEdit }) => {
  const { description, status } = task;

  return (
    <div className={`task`}>
      <div className="task-info">
        <p>{description}</p>
        <p className={status}>{status}</p>
      </div>
      <div className="task-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
