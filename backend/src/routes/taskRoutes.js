import express from "express";
const router = express.Router();
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { validateTask, validationHandler } from "../middleware/validators.js";
import { protect } from "../middleware/auth.js";

// All task routes are protected
router.use(protect);

router
  .route("/")
  .get(getTasks)
  .post(validateTask, validationHandler, createTask);

router
  .route("/:id")
  .get(getTask)
  .put(validateTask, validationHandler, updateTask)
  .delete(deleteTask);

export default router;
