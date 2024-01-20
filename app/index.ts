import yargs from "yargs";
import fs from "fs";
import chalk from "chalk";
import {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
  clearAllTasks,
  markAsCompleted,
} from "./model/task";

interface Args {
  title: string;
  description: string;
  id: string;
}

// tạo lệnh test
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

// CRUD

// create
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args: yargs.Arguments) => {
    const { title, description } = args;
    const newTask = createTask(title as string, description as string);
    console.log("đã tạo mới công việc thành công : ", newTask);
  },
});

// read-all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(chalk.blue("taskJson : "), result);
  },
});

// read-detail
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args: yargs.Arguments) => {
    const { id } = args;
    const task = readDetailTask(id as string);
    if (task) {
      console.log("task : ", task);
    } else {
      console.log(chalk.red("Not Found!"));
    }
  },
});

// update
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args: yargs.Arguments) => {
    const { id, title, description } = args;
    const task = updateTask(id as string, title as string, description as string);
    if (task) {
      console.log("task updated : ", task);
    } else {
      console.log(chalk.red("Not Found!"));
    }
  },
});

// delete
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args: yargs.Arguments) => {
    const { id } = args;
    const task = deleteTask(id as string);
    if (task) {
      console.log("delete task : ", task);
    } else {
      console.log(chalk.red("Not Found!"));
    }
  },
});

// count - node app/index.ts count
yargs.command({
  command: "count",
  handler: () => {
    const tasks = readAllTask();
    console.log(`Hiện tại có tổng cộng ${tasks.length} công việc.`);
  },
});

// find - node app/index.ts find --title="Hoc NodeJS"
yargs.command({
  command: "find",
  builder: {
    title: {
      type: "string",
    },
  },
  handler: (args: yargs.Arguments) => {
    const { title } = args;
    const tasks = readAllTask();
    const foundTasks = tasks.filter(task => task.title.includes(title as string));
    console.log(`Các công việc có tiêu đề chứa '${title}': `, foundTasks);
  },
});

// completed - node app/index.ts completed --id="123"
yargs.command({
  command: "completed",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args: yargs.Arguments) => {
    const { id } = args;
    const task = markAsCompleted(id as string);
    if (task) {
      console.log("Đã đánh dấu công việc là hoàn thành: ", task);
    } else {
      console.log(chalk.red("Not Found!"));
    }
  },
});

// clear - node app/index.ts clear
yargs.command({
  command: "clear",
  handler: () => {
    const task = clearAllTasks();
    console.log("Đã xóa tất cả công việc.");
  },
});

// lưu lại các lệnh vừa tạo
yargs.parse();
