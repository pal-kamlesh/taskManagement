// src/components/TaskFilter.jsx
function TaskFilter({ selectedStatus, onStatusChange }) {
  return (
    <div className="task-filter">
      <label htmlFor="status-filter">Filter by Status:</label>
      <select
        id="status-filter"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  )
}

export default TaskFilter