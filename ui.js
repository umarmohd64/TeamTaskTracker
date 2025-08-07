import { taskStorage } from './storage.js';
import { STATUS } from './constants.js';
import { taskList, dropdown, dropdownButton, taskNameInput, assignedToHidden, addBtn } from './dom.js';

export class UIService {
  constructor(taskService) {
  this.taskService = taskService;
  this.editingIndex = null;

  // Set up dropdown refs once
  this.dropdown = document.getElementById('personDropdown');
  this.dropdownButton = document.getElementById('dropdownBtn');
  this.assignedToHidden = document.getElementById('assignedToHidden');
}


  renderTasks(tasks = taskStorage.getTasks()) {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.setAttribute('data-status', task.status);
      li.innerHTML = `
        <span>${task.name} - ${task.assignedTo} - ${task.status}</span>
        <div class="task-controls">
          <button data-action="status" data-index="${index}">${this.getStatusLabel(task.status)}</button>
          <button data-action="edit" data-index="${index}">Edit</button>
          <button data-action="delete" data-index="${index}">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  getStatusLabel(status) {
    if (status === STATUS.TODO) return 'Start';
    if (status === STATUS.IN_PROGRESS) return 'Complete';
    return 'Reset';
  }

  resetForm() {
    taskNameInput.value = '';
    assignedToHidden.value = '';
    dropdownButton.textContent = 'Select member';
    dropdown.style.display = 'none';
    addBtn.textContent = 'Add Task';
    this.editingIndex = null;
  }

  prefillForm(name, assignedTo, index) {
    taskNameInput.value = name;
    assignedToHidden.value = assignedTo;
    dropdownButton.textContent = assignedTo;
    addBtn.textContent = 'Update Task';
    this.editingIndex = index;
  }

setupDropdown() {
  // Handle clicking on a member option
  document.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', () => {
      this.dropdownButton.textContent = option.textContent;
      this.assignedToHidden.value = option.textContent;
      this.dropdown.style.display = 'none';
    });
  });

  // Toggle dropdown on button click
  this.dropdownButton.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent document click from immediately closing it
    const isVisible = this.dropdown.style.display === 'block';
    this.dropdown.style.display = isVisible ? 'none' : 'block';
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!this.dropdown.contains(event.target) && !this.dropdownButton.contains(event.target)) {
      this.dropdown.style.display = 'none';
    }
  });
}


  handleListClick(e) {
    const button = e.target.closest('button');
    if (!button) return;
    const index = parseInt(button.dataset.index);
    const action = button.dataset.action;
    if (action === 'status') this.taskService.updateStatus(index);
    else if (action === 'edit') this.taskService.editTask(index);
    else if (action === 'delete') this.taskService.deleteTask(index);
  }
}
