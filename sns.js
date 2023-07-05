let taskArray = [];
let id = 0;
const baseURL = `https://aizuhack-web-back-5rzsnwb2sq-de.a.run.app/s1310240/tasks`;
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', async function () {
  const taskInput = document.getElementById('task-input');
  const content = taskInput.value;
  async function okuru() {
    const task = {
      content: content,
    };
    await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  }
  await okuru();
  taskInput.value = '';
  const task = {
    content: content,
  };
  id++;
  taskArray.push(task);
  update();
});
async function update() {
  const taskList = document.getElementById('task-list');
  while (taskList.firstChild !== null) {
    taskList.removeChild(taskList.firstChild);
  }
  async function shutoku() {
    const response = await fetch(baseURL, {
      method: 'GET',
    });
    const body = await response.json();
    return body.tasks;
  }
  const taskArray = await shutoku();
  for (let i = 0; i < taskArray.length; i++) {
    const task = taskArray[i];
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.append(task.content);
    taskList.appendChild(taskDiv);
  }
}

update();
