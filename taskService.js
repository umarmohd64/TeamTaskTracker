// taskService.js
import { taskStorage } from './storage.js';
import { STATUS, STATUS_CYCLE } from './constants.js';

export class TaskService {
  constructor(uiService) {
    this.uiService = uiService;
  }

  addTask(name, assignedTo) {
    try {
      if (!name || !assignedTo) throw new Error("Missing task name or assignee");

      const tasks = taskStorage.getTasks();
      tasks.push({ name, assignedTo, status: STATUS.TODO });
      taskStorage.setTasks(tasks);
      this.uiService.renderTasks(tasks);
      this.uiService.resetForm();
    } catch (error) {
      alert(error.message);
    }
  }

  updateStatus(index) {
    try {
      const tasks = taskStorage.getTasks();
      const currentStatus = tasks[index].status;
      const nextIndex = (STATUS_CYCLE.indexOf(currentStatus) + 1) % STATUS_CYCLE.length;
      tasks[index].status = STATUS_CYCLE[nextIndex];
      taskStorage.setTasks(tasks);
      this.uiService.renderTasks(tasks);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  editTask(index) {
    try {
      const tasks = taskStorage.getTasks();
      const task = tasks[index];
      this.uiService.prefillForm(task.name, task.assignedTo, index);
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  }

  deleteTask(index) {
    try {
      const tasks = taskStorage.getTasks();
      tasks.splice(index, 1);
      taskStorage.setTasks(tasks);
      this.uiService.renderTasks(tasks);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  updateTask(index, updatedTask) {
    try {
      const tasks = taskStorage.getTasks();
      tasks[index] = updatedTask;
      taskStorage.setTasks(tasks);
      this.uiService.renderTasks(tasks);
      this.uiService.resetForm();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }
}
