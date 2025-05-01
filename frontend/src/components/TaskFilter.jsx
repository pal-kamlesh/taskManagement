import { CheckCircle, Clock, Filter, Star } from "lucide-react";

function TaskFilter({ selectedStatus, onStatusChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <button
        onClick={() => onStatusChange("all")}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-1
          ${
            selectedStatus === "all"
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-800"
          }`}
      >
        <Filter size={16} /> All Adventures
      </button>
      <button
        onClick={() => onStatusChange("To Do")}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-1
          ${
            selectedStatus === "To Do"
              ? "bg-red-500 text-white"
              : "bg-red-100 text-red-800"
          }`}
      >
        <Star size={16} /> To Do 🚀
      </button>
      <button
        onClick={() => onStatusChange("In Progress")}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-1
          ${
            selectedStatus === "In Progress"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-800"
          }`}
      >
        <Clock size={16} /> In Progress ⚡
      </button>
      <button
        onClick={() => onStatusChange("Done")}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-1
          ${
            selectedStatus === "Done"
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-800"
          }`}
      >
        <CheckCircle size={16} /> Done 🎉
      </button>
    </div>
  );
}

export default TaskFilter;
