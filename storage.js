import { STORAGE_KEYS } from './constants.js';

class TaskStorage {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load tasks from storage:', error);
      return [];
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(newTasks) {
    this.tasks = newTasks;
    this.saveTasks();
  }
}

export const taskStorage = new TaskStorage();
