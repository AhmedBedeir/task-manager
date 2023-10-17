import Task from "./Task";

const TaskList = ({
  tasks,
  onDelete,
  onEdit,
  sortCategory,
  filterCategory,
  currentPage,
  tasksPerPage,
  onPageChange,
}) => {
  const filterTasks = tasks.filter((task) => {
    if (filterCategory === "all") {
      return true;
    }
    return task.status === filterCategory;
  });
  let sortedTasks = [...filterTasks];
  if (sortCategory === "date") {
    sortedTasks.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
  }

  if (sortCategory === "desc") {
    sortedTasks.sort((a, b) => {
      if (a.description < b.description) {
        return -1;
      }
      if (a.description > b.description) {
        return 1;
      }
      return 0;
    });
  }
  if (sortCategory === "status") {
    sortedTasks.sort((a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
  }

  if (!sortedTasks.length) {
    return <h3 className="white">No tasks to show...</h3>;
  }
  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  // Get tasks for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  return (
    <>
      <div className="task-list">
        {currentTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id, task.description)}
            onEdit={() => onEdit(task.id)}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span
          className="white"
          style={{
            margin: "0 1rem",
          }}
        >{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TaskList;
