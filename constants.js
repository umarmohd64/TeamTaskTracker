const STORAGE_KEYS = {
  TASKS: 'tasks'
};

const STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
};

const STATUS_CYCLE = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE];

export { STORAGE_KEYS, STATUS, STATUS_CYCLE };
