import { taskNameInput, assignedToHidden, addBtn, taskList } from './dom.js';
import { TaskService } from './taskService.js';
import { UIService } from './ui.js';

const ui = new UIService();
const taskService = new TaskService(ui);
ui.taskService = taskService;

ui.renderTasks();
ui.setupDropdown();

addBtn.addEventListener('click', () => {
  const name = taskNameInput.value.trim();
  const assignedTo = assignedToHidden.value;

  if (ui.editingIndex !== null) {
    taskService.updateTask(ui.editingIndex, { name, assignedTo, status: 'To Do' });
  } else {
    taskService.addTask(name, assignedTo);
  }
});

taskList.addEventListener('click', (e) => ui.handleListClick(e));
