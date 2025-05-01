const API_URL = import.meta.env.VITE_API_URL;

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        errorData?.errors[0]?.message ||
        "Something went wrong"
    );
  }

  return response.json();
};

// Auth API calls
export const login = async (email, password) => {
  return fetchWithAuth("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (username, email, password) => {
  return fetchWithAuth("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
};

// Tasks API calls
export const getTasks = async () => {
  return fetchWithAuth("/tasks");
};

export const getTask = async (id) => {
  return fetchWithAuth(`/tasks/${id}`);
};

export const createTask = async (taskData) => {
  return fetchWithAuth("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
};

export const updateTask = async (id, taskData) => {
  return fetchWithAuth(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (id) => {
  return fetchWithAuth(`/tasks/${id}`, {
    method: "DELETE",
  });
};
