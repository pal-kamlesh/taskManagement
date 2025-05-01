import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, createTask, updateTask } from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  Star,
  Zap,
  CheckCircle,
  Calendar,
  Pencil,
  PlusCircle,
} from "lucide-react";

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Status config for dynamic styling
  const statusConfig = {
    "To Do": {
      bgColor: "bg-red-100",
      borderColor: "border-red-400",
      textColor: "text-red-600",
      icon: <Star className="text-red-500" size={20} />,
      emoji: "🚀",
    },
    "In Progress": {
      bgColor: "bg-blue-100",
      borderColor: "border-blue-400",
      textColor: "text-blue-600",
      icon: <Zap className="text-blue-500" size={20} />,
      emoji: "⚡",
    },
    Done: {
      bgColor: "bg-green-100",
      borderColor: "border-green-400",
      textColor: "text-green-600",
      icon: <CheckCircle className="text-green-500" size={20} />,
      emoji: "🎉",
    },
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isEditing) {
      fetchTask();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated, navigate]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const { data: task } = await getTask(id);
      const formattedDate = new Date(task.dueDate).toISOString().split("T")[0];

      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: formattedDate,
      });
    } catch (err) {
      setError("Failed to fetch task details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (isEditing) {
        await updateTask(id, formData);
      } else {
        await createTask(formData);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      navigate("/");
    } catch (err) {
      setError(`Failed to ${isEditing ? "update" : "create"} task`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-bounce text-4xl">🎮 Loading...</div>
      </div>
    );

  const currentStatus = statusConfig[formData.status];

  return (
    <div className="max-w-lg mx-auto my-8 p-6 rounded-xl shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-indigo-200">
      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
          {/* This would be where you'd implement confetti animation */}
          <div className="absolute text-4xl animate-bounce">🎉</div>
          <div
            className="absolute text-4xl animate-bounce"
            style={{ left: "20%", animationDelay: "0.2s" }}
          >
            🎈
          </div>
          <div
            className="absolute text-4xl animate-bounce"
            style={{ left: "40%", animationDelay: "0.5s" }}
          >
            🎊
          </div>
          <div
            className="absolute text-4xl animate-bounce"
            style={{ left: "60%", animationDelay: "0.3s" }}
          >
            ✨
          </div>
          <div
            className="absolute text-4xl animate-bounce"
            style={{ left: "80%", animationDelay: "0.7s" }}
          >
            🌟
          </div>
        </div>
      )}

      <div className="flex items-center justify-center mb-6">
        <div
          className={`text-3xl ${
            isEditing ? "text-indigo-600" : "text-purple-600"
          } font-bold flex items-center gap-2`}
        >
          {isEditing ? (
            <>
              <Pencil className="text-indigo-500" size={24} /> Edit Your
              Adventure!
            </>
          ) : (
            <>
              <PlusCircle className="text-purple-500" size={24} /> Create New
              Mission!
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <span className="mr-2">😕</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className=" text-lg font-medium text-indigo-700 flex items-center gap-1"
          >
            <span className="text-xl">📝</span> Mission Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg transition-all duration-200 hover:border-indigo-400"
            placeholder="What's your mission called?"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className=" text-lg font-medium text-indigo-700 flex items-center gap-1"
          >
            <span className="text-xl">📋</span> Mission Details
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg transition-all duration-200 hover:border-indigo-400"
            placeholder="Tell me more about this adventure!"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="status"
            className=" text-lg font-medium text-indigo-700 flex items-center gap-1"
          >
            <span className="text-xl">🏆</span> Mission Status
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 ${currentStatus.borderColor} ${currentStatus.bgColor} ${currentStatus.textColor} font-medium focus:ring focus:ring-opacity-50 text-lg transition-all duration-200 appearance-none`}
            >
              <option value="To Do" className="bg-white text-red-600">
                To Do {statusConfig["To Do"].emoji}
              </option>
              <option value="In Progress" className="bg-white text-blue-600">
                In Progress {statusConfig["In Progress"].emoji}
              </option>
              <option value="Done" className="bg-white text-green-600">
                Done {statusConfig["Done"].emoji}
              </option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {currentStatus.icon}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="dueDate"
            className=" text-lg font-medium text-indigo-700 flex items-center gap-1"
          >
            <span className="text-xl">📅</span> Complete By
          </label>
          <div className="relative">
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg transition-all duration-200 hover:border-indigo-400"
            />
            <Calendar
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-indigo-500"
              size={20}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className={`flex-1 px-6 py-3 rounded-lg text-white font-bold text-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isEditing
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 focus:ring-indigo-500"
                : "bg-gradient-to-r from-pink-500 to-purple-600 focus:ring-purple-500"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🔄</span>
                {isEditing ? "Updating..." : "Creating..."}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {isEditing ? <>✏️ Update Mission!</> : <>✨ Launch Mission!</>}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            👈 Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
