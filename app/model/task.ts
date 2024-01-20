import fs from "fs";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const readAllTask = (): Task[] => {
  const buffer = fs.readFileSync("task.json"); // hex
  // chuyển sang chuỗi
  const taskString = buffer.toString();
  // chuyển sang Json
  const taskJson: Task[] = JSON.parse(taskString);
  return taskJson;
};

// Tạo 1 kho để lưu trữ các ID đã được sử dụng
const usedIds = new Set(readAllTask().map(task => task.id));

const createTask = (title: string, description: string): Task => {
  let id;
  do {
    id = Math.floor(Math.random() * 900000 + 100000).toString();
  } while (usedIds.has(id)); // Nếu ID đã được sử dụng, tạo một ID mới

  usedIds.add(id); // Thêm ID mới vào tập hợp các ID đã được sử dụng

  const newTask: Task = {
    id,
    title,
    description,
    completed: false
  };
  let taskList = readAllTask();
  taskList = [...taskList, newTask];
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  return newTask;
};

const readDetailTask = (id: string): Task | undefined => {
  let taskList = readAllTask();
  const task = taskList.find((task) => id === task.id);
  return task;
};

const updateTask = (id: string, title: string, description: string): Task | false => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    // thực hiện update
    const oldTask = taskList[index];
    const newTask: Task = { ...oldTask, title, description };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    // thông báo cho người dùng biết
    return false;
  }
};

const deleteTask = (id: string): Task | false => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const task = taskList[index];
    taskList = taskList.filter((task) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    return false;
  }
};

const markAsCompleted = (id: string): Task | false => {
  let taskList = readAllTask();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const oldTask = taskList[index];
    const newTask: Task = { ...oldTask, completed: true };
    taskList[index] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    return false;
  }
};

const clearAllTasks = (): void => {
  fs.writeFileSync("task.json", JSON.stringify([]));
};

export {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
  markAsCompleted,
  clearAllTasks,
};
