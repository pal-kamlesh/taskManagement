const express = require('express');
const router = express.Router();
const { 
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { validateTask, validationHandler } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

// All task routes are protected
router.use(protect);

router
  .route('/')
  .get(getTasks)
  .post(validateTask, validationHandler, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(validateTask, validationHandler, updateTask)
  .delete(deleteTask);

module.exports = router;