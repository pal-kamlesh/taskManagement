import Task from "../models/Task.js";

/**
 * @desc    Get all tasks for the authenticated user
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    // Build query
    const query = { userId: req.user.id };

    // Filter by status if provided
    if (
      req.query.status &&
      ["To Do", "In Progress", "Done"].includes(req.query.status)
    ) {
      query.status = req.query.status;
    }

    // Search by title if provided
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    // Sort options
    let sortBy = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case "dueDate":
          sortBy = { dueDate: 1 };
          break;
        case "dueDate_desc":
          sortBy = { dueDate: -1 };
          break;
        case "status":
          sortBy = { status: 1 };
          break;
        default:
          sortBy = { createdAt: -1 };
      }
    } else {
      // Default sort by created date (newest first)
      sortBy = { createdAt: -1 };
    }

    // Execute query
    const tasks = await Task.find(query).sort(sortBy);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new task
 * @route   POST /api/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    // Add user ID to request body
    req.body.userId = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Update task
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

export { getTask, getTasks, updateTask, deleteTask, createTask };
