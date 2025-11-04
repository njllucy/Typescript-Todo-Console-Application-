import * as readline from "readline-sync";

//Defining a todo type using interface

interface Todo {
  id: number;
  task: string;
  completed: string;
}

//creating an array to store todos
let todos: Todo[] = [];

//function to add new todo
function toAdd(task: string): void {
  const exist = todos.some(
    (todo) => todo.task.toLocaleLowerCase() === task.toLocaleLowerCase()
  );
  if (exist) {
    console.log("Task Already exist ! Try Another Name.");
  } else {
    const newTodo: Todo = {
      id: todos.length + 1,
      task: task,
      completed: "no",
    };
    todos.push(newTodo);
    console.log(`Aded a New task(Name) : ${task}`);
  }
}

//function to list all todos

function listTodos(): void {
  if (todos.length === 0) {
    console.log("No Tasks Yet");
  } else {
    console.log("Task ID\t\tCompeted\tTask Name");
    todos.forEach((todo) => {
      console.log(`${todo.id}\t\t${todo.completed}\t\t${todo.task}`);
    });
  }
}

//function to edit
function edit(item: number): void {
  const todo = todos.find((todo) => todo.id === item);
  if (!todo) {
    console.log("Id doesn't Exit ! ");
    return;
  }
  const input = readline.question(
    "Enter what you want to edit : task(Type T) or completed(Type C) ? : "
  );
  if (input === "T") {
    const NewtaskName = readline.question("Enter Task Name : ");
    const newNameExist = todos.some((x) => x.task === NewtaskName);

    if (newNameExist) {
      console.log("Given Task Name Already Exists !");
      return;
    }
    todo.task = NewtaskName;
    console.log("Task Updated Successfully ! ");
  } else if (input === "C") {
    const status = readline.question("Is task completed? (yes/no): ");
    todo.completed = status.toLocaleLowerCase();
    console.log("Task Status Update Successfully !");
  } else {
    console.log("Invalid Input ! ");
  }
}

//function to delete a todo
function deletTodo(id: number): void {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    console.log("Id doesn't Exit ! ");
    return;
  } else if (todo?.completed === "no") {
    console.log("Task is not completed Yet ! ");
    return;
  }
  todos = todos.filter((x) => x.id !== id);
  todos.forEach((todo, index) => {
    todo.id = index + 1;
  });
  console.log(`Deletd the task with id ${id}`);
  todos.length - 1;
}

function Menu() {
    let exit = false;
  while(!exit){
    console.log("\t\t\tOperations Menu");
  console.log("\t\t1.Add Task");
  console.log("\t\t2.List Todo");
  console.log("\t\t3.Edit Task");
  console.log("\t\t4.Delete Task");
  console.log("\t\t5.Exit");

  const choice = readline.question("Choose an Option : ");

  if (choice === "1") {
    const taskName = readline.question("Enter Task Name : ");
    toAdd(taskName);
  } else if (choice === "2") {
    listTodos();
  } else if (choice === "3") {
    const editinput = Number(
      readline.question(
        "Which part you want to edit (Give id number of the task) : "
      )
    );
    edit(editinput);
  } else if (choice === "4") {
    const id = readline.questionInt("Enter the ID : ");
    deletTodo(id);
  } else if (choice === "5") {
    console.log("Goodbye!");
    exit=true;
  } else {
    console.log("Invalid choice. Try again.");
  }
  }
  
}
Menu();
