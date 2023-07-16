let taskArray = [];
let id = 0;
const baseURL = `http://localhost:8080`;
const baseURL2 =`http://localhost:8080/user`; 
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', async function () {
  const taskInput = document.getElementById('task-input');
  const NameInput = document.getElementById('name-input');
  const content = taskInput.value;
  const userName = NameInput.value;
  async function okuru() {
    const task = {
      userName: userName,
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
  NameInput.value = '';
  taskInput.value = '';
  const task = {
    content: content,
    userName: userName,
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
    return body;
  }
  const taskArray = await shutoku();
  for (let i = 0; i < taskArray.length; i++) {
    const task = taskArray[i];
    const nameDiv = document.createElement('div');
    const taskDiv = document.createElement('div');
    nameDiv.classname = 'name';
    taskDiv.className = 'task';
    taskDiv.append(task.userName);
    taskDiv.append(task.content);
    taskList.appendChild(taskDiv);
    taskDiv.innerHTML = `<span class="name">${task.userName}</span><br><span class="content">${task.content}</span>`;
    taskList.append(document.createElement('hr'));
  }
}
update();
