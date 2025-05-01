import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../services/api";
import { useAuth } from "../context/AuthContext";
import TaskFilter from "./TaskFilter";
import {
  Search,
  Calendar,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit3,
} from "lucide-react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [completeAnimation, setCompleteAnimation] = useState(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, [isAuthenticated, navigate]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    if (newStatus === "Done" && task.status !== "Done") {
      setCompleteAnimation(task._id);
      setTimeout(() => setCompleteAnimation(null), 2000);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort tasks
  let filteredTasks = tasks;

  // Apply status filter
  if (statusFilter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === statusFilter
    );
  }

  // Apply search filter (case-insensitive)
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
    );
  }

  // Apply sorting
  filteredTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "status") {
      comparison = a.status.localeCompare(b.status);
    } else if (sortBy === "dueDate") {
      comparison = new Date(a.dueDate) - new Date(b.dueDate);
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isOverdue = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today;
  };

  const getColorScheme = (status, dueDate) => {
    // Check for overdue first
    if (status !== "Done" && isOverdue(dueDate)) {
      return {
        bg: "bg-red-100",
        border: "border-red-400",
        text: "text-red-800",
        button: "bg-red-500 hover:bg-red-600",
        shadow: "shadow-red-200",
      };
    }

    switch (status.toLowerCase()) {
      case "done":
        return {
          bg: "bg-green-100",
          border: "border-green-400",
          text: "text-green-800",
          button: "bg-green-500 hover:bg-green-600",
          shadow: "shadow-green-200",
        };
      case "in progress":
        return {
          bg: "bg-blue-100",
          border: "border-blue-400",
          text: "text-blue-800",
          button: "bg-blue-500 hover:bg-blue-600",
          shadow: "shadow-blue-200",
        };
      case "to do":
        return {
          bg: "bg-yellow-100",
          border: "border-yellow-400",
          text: "text-yellow-800",
          button: "bg-yellow-500 hover:bg-yellow-600",
          shadow: "shadow-yellow-200",
        };
      default:
        return {
          bg: "bg-purple-100",
          border: "border-purple-400",
          text: "text-purple-800",
          button: "bg-purple-500 hover:bg-purple-600",
          shadow: "shadow-purple-200",
        };
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-center">
          <div className="animate-bounce text-5xl mb-4">🚀</div>
          <p className="text-lg font-medium text-indigo-600">
            Loading your awesome missions...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
        <div className="flex">
          <div className="py-1">
            <svg
              className="w-6 h-6 mr-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <p className="font-bold">Oops!</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-indigo-700 flex items-center">
          <span className="mr-2">📋</span>My Super Missions
        </h2>
        <Link
          to="/add"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 flex items-center"
        >
          <span className="mr-2">✨</span>Add New Mission
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-3 w-full border-2 border-indigo-200 focus:border-indigo-500 rounded-full text-lg"
              placeholder="Search for a mission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TaskFilter
          selectedStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Sort Options */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button
            onClick={() => handleSort("dueDate")}
            className={`px-4 py-2 rounded-full font-medium transition transform hover:scale-105 flex items-center gap-1
              ${
                sortBy === "dueDate"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-800"
              }`}
          >
            <Calendar size={16} />
            Due Date
            {sortBy === "dueDate" &&
              (sortDirection === "asc" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              ))}
          </button>
          <button
            onClick={() => handleSort("title")}
            className={`px-4 py-2 rounded-full font-medium transition transform hover:scale-105 flex items-center gap-1
              ${
                sortBy === "title"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-800"
              }`}
          >
            A-Z
            {sortBy === "title" &&
              (sortDirection === "asc" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              ))}
          </button>
          <button
            onClick={() => handleSort("status")}
            className={`px-4 py-2 rounded-full font-medium transition transform hover:scale-105 flex items-center gap-1
              ${
                sortBy === "status"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-800"
              }`}
          >
            Status
            {sortBy === "status" &&
              (sortDirection === "asc" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              ))}
          </button>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 bg-indigo-50 rounded-xl border-2 border-dashed border-indigo-200">
          <div className="text-5xl mb-4">🏝️</div>
          <p className="text-xl text-gray-600">
            {searchTerm
              ? "No matching missions found."
              : "No missions found. Time to add some!"}
          </p>
          {searchTerm && (
            <button
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            const colors = getColorScheme(task.status, task.dueDate);
            const isTaskOverdue =
              task.status !== "Done" && isOverdue(task.dueDate);

            return (
              <div
                key={task._id}
                className={`rounded-xl ${colors.bg} border-2 ${colors.border} overflow-hidden transform transition hover:-translate-y-1 ${colors.shadow} shadow-lg relative`}
              >
                {/* Celebration Animation */}
                {completeAnimation === task._id && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-500 bg-opacity-20 backdrop-blur-sm"></div>
                    <div className="text-6xl animate-bounce">🎉</div>
                  </div>
                )}

                {/* Overdue Badge */}
                {isTaskOverdue && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl-lg font-bold text-xs">
                    OVERDUE!
                  </div>
                )}

                <div className="p-5">
                  <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.text} bg-white bg-opacity-50`}
                      onClick={() => handleStatusChange(task, "Done")}
                    >
                      {task.status === "To Do" && "🚀 "}
                      {task.status === "In Progress" && "⚡ "}
                      {task.status === "Done" && "🎉 "}
                      {task.status}
                    </span>
                    <span className=" px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-50 text-gray-700 flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>

                  <div className="flex justify-between mt-4 gap-2">
                    <Link
                      to={`/edit/${task._id}`}
                      className={`flex-1 text-center px-4 py-2 ${colors.button} text-white rounded-full font-medium transition transform hover:scale-105 flex items-center justify-center gap-1`}
                    >
                      <Edit3 size={16} />
                      Edit
                    </Link>

                    {showDeleteConfirm === task._id ? (
                      <div className="flex-1 flex gap-1">
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition transform hover:scale-105"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition transform hover:scale-105"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowDeleteConfirm(task._id)}
                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition transform hover:scale-105 flex items-center justify-center gap-1"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TaskList;
