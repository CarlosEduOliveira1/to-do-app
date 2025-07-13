async function loadTasks() {
  const response = await fetch("/tasks");
  const tasks = await response.json();
  const taskList = document.getElementById("task-list");

  taskList.innerHTML = "";
  console.log(tasks.tasks);

  tasks.tasks.forEach((task, i, arr) => {
    let item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center taskItem";

    if (i === arr.length - 1) {
      item.classList.add("last-task-item");
    }

    item.setAttribute("data-id", task.id);

    let div = document.createElement("div");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${task.id}`;
    checkbox.name = `task${task.id}`;
    checkbox.value = `task${task.id}`;
    checkbox.checked = task.is_finished ? true : false;
    checkbox.setAttribute("onclick", `changeStatus(${task.id})`);
    checkbox.setAttribute("data-id", task.id);

    let span = document.createElement("span");
    span.setAttribute("data-id", task.id);
    span.textContent = task.title || "Task";
    span.style.paddingLeft = "10px";

    div.appendChild(checkbox);
    div.appendChild(span);

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn-close";
    button.setAttribute("onclick", `deleteTask(${task.id})`);
    button.setAttribute("aria-label", "Close");
    button.setAttribute("data-id", task.id);

    item.appendChild(div);
    item.appendChild(button);

    taskList.appendChild(item);

    handleCheckbox(task.id);
  });
}

async function insertTask() {
  let newTask = document.getElementById("inputTask").value;
  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: newTask }),
  });

  loadTasks();
}

async function changeStatus(taskId) {
  await fetch("/changeStatus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId: taskId }),
  });

  loadTasks();
}

async function deleteTask(taskId) {
  await fetch("/deleteTask", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId: taskId }),
  });

  loadTasks();
}

function handleCheckbox(taskId) {
  const checkbox = document.getElementById(`checkbox-${taskId}`);
  var span = checkbox.nextElementSibling;

  if (span) {
    if (checkbox.checked) {
      span.classList.add("task-finished");
    } else {
      span.classList.remove("task-finished");
    }
  }
}
