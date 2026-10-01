 const taskInput = document.getElementById("taskInput");
 const addTaskBtn = document.getElementById("addTaskBtn");
 const loadSamplesBtn = document.getElementById("loadSamplesBtn");
 const taskList = document.getElementById("taskList");
 const taskMessage = document.getElementById("taskMessage");
 const totalCount = document.getElementById("totalCount");
 const pendingCount = document.getElementById("pendingCount");
  const completedCount = document.getElementById("completedCount");



const sampleTasks = [
  "Review DOM selectors",
  "Practice createElement",
  "Study event delegation"
];

let taskCounter = 0;

function generateTaskId() {
  taskCounter++;
  return "task-" + taskCounter;
}

function createButton(className, label) {
  const button = document.createElement("button");
  button.className = className;
  button.textContent = label;
  return button;
}

function createTaskElement(taskText, taskId) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.dataset.taskId = taskId;
  taskItem.dataset.state = "pending";

  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = taskText;

  taskItem.appendChild(textSpan);
  taskItem.appendChild(createButton("complete-btn", "Complete"));
  taskItem.appendChild(createButton("edit-btn", "Edit"));
  taskItem.appendChild(createButton("remove-btn", "Remove"));

  return taskItem;
}

function addTask(taskText) {
  const text = taskText.trim();

  if (text === "") {
    taskMessage.textContent = "Task cannot be empty";
    return;
  }

  const taskItem = createTaskElement(text, generateTaskId());
  taskList.appendChild(taskItem);

  taskInput.value = "";
  taskMessage.textContent = "";
  updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
  taskItem.classList.toggle("completed");

  if (taskItem.classList.contains("completed")) {
    taskItem.dataset.state = "completed";
  } else {
    taskItem.dataset.state = "pending";
  }

  updateTaskCounts();
}

function beginTaskEdit(taskItem) {
  const textSpan = taskItem.querySelector(".task-text");
  const editBtn = taskItem.querySelector(".edit-btn");

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("edit-input");
  editInput.value = textSpan.textContent;

  textSpan.replaceWith(editInput);
  editBtn.textContent = "Save";
  editInput.focus();
}

function saveTaskEdit(taskItem) {
  const editInput = taskItem.querySelector(".edit-input");
  const editBtn = taskItem.querySelector(".edit-btn");
  const text = editInput.value.trim();

  if (text === "") {
    taskMessage.textContent = "Task cannot be empty";
    return;
  }

  const textSpan = document.createElement("span");
  textSpan.classList.add("task-text");
  textSpan.textContent = text;

  editInput.replaceWith(textSpan);
  editBtn.textContent = "Edit";
  taskMessage.textContent = "";
}

function removeTask(taskItem) {
  taskItem.remove();
  updateTaskCounts();
}

function updateTaskCounts() {
  const tasks = taskList.querySelectorAll(".task-item");
  let pending = 0;
  let completed = 0;

  tasks.forEach(function (task) {
    if (task.dataset.state === "completed") {
      completed++;
    } else {
      pending++;
    }
  });

  totalCount.textContent = tasks.length;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}

function handleTaskListClick(event) {
  const clicked = event.target;
  const taskItem = clicked.closest(".task-item");

  if (!taskItem) {
    return;
  }

  if (clicked.matches(".complete-btn")) {
    toggleTaskComplete(taskItem);
  } else if (clicked.matches(".edit-btn")) {
    if (clicked.textContent === "Save") {
      saveTaskEdit(taskItem);
    } else {
      beginTaskEdit(taskItem);
    }
  } else if (clicked.matches(".remove-btn")) {
    removeTask(taskItem);
  }
}

function loadSampleTasks() {
  const fragment = document.createDocumentFragment();

  sampleTasks.forEach(function (text) {
    fragment.appendChild(createTaskElement(text, generateTaskId()));
  });

  taskList.appendChild(fragment);
  updateTaskCounts();
}

// Event listeners
addTaskBtn.addEventListener("click", function () {
  addTask(taskInput.value);
});
loadSamplesBtn.addEventListener("click", loadSampleTasks);
taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();
