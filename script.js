// Unlock audio on first interaction
document.body.addEventListener('click', () => {
    alarmSound.play().catch(() => {});
  }, { once: true });
  

const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoTime = document.getElementById('todo-time');
const todoList = document.getElementById('todo-list');
const darkToggle = document.getElementById('toggle-dark');
const alarmSound = document.getElementById('alarm-sound');

// Dark mode toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', e => e.key === 'Enter' && addTask());

function addTask() {
  const task = todoInput.value.trim();
  const time = todoTime.value;

  if (task === '' || time === '') {
    alert('Please enter both a task and a time.');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="info">
      <strong>${task}</strong><br />
      <small>Alarm set for: ${time}</small>
    </div>
    <button class="delete-btn">Delete</button>
  `;

  todoList.appendChild(li);
  scheduleAlarm(time, task);

  li.querySelector('.delete-btn').addEventListener('click', () => li.remove());

  todoInput.value = '';
  todoTime.value = '';
}

function scheduleAlarm(time, task) {
  const [hour, minute] = time.split(':').map(Number);
  const now = new Date();
  const alarm = new Date(now);

  alarm.setHours(hour, minute, 0, 0);

  const delay = alarm - now;

  if (delay > 0) {
    setTimeout(() => {
      alert(`⏰ Task Reminder: "${task}"`);
      alarmSound.play();
    }, delay);
  }
}
