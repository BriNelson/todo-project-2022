// name
//completed
//id
//category
//due Date

//* User can view todos

//* User can add todos

//* User can edit todos

//* User can delete todos

//* App shows the user number of todos left to complete

//* App can delete (aka clear) all done todos at once.

let todoData = [
  {
    taskName: "test",
    completed: false,
    id: 1,
    category: "exercise",
    dueDate: "dateObj",
  },

  {
    taskName: "homework",
    completed: false,
    id: 2,
    category: "exercise",
    dueDate: "dateObj",
  },
  {
    taskName: "work out",
    completed: false,
    id: 3,
    category: "exercise",
    dueDate: "dateObj",
  },
];

console.log(todoData);

//Add todo button
const addTodoButton = document.querySelector('#addTodoButton')
let fullTodoList = document.querySelector('#toDoList');
// Delete listener
fullTodoList.addEventListener('click', (event) => {
  if (event.target.matches(".deleteBtn")) {
    
    todoData.splice(event.target.id, 1);
    printTodoList(todoData);
  }
})
// edit listener
// fullTodoList.addEventListener('click', (event) => {
//   if (event.target.matches(".editBtn")) {
    
//    console.log( 'works')
//   }
// })



// Add todo listener
addTodoButton.addEventListener("click", () => {
    let newTask = {
        taskName: document.querySelector("#userTask").value,
        category: 'test',
        id: todoData.length + 1,
        completed: false,
        dueDate: 'test date'
    }
    
    todoData.unshift(newTask);

    console.log(newTask);
    printTodoList(todoData)
 })

 //handles complete (uglyish)
document.addEventListener("click", function (event) {
   

  // **** might beable to do this with operands
  if (event.target.checked === true) {
    // console.log(event.target.id)
    todoData.forEach(element => {
      if (parseInt(event.target.id) === element.id) {
        element.completed = true;
        console.log(element)
        
      }
      
    });
    
  }

  if (event.target.checked === false) {
    // console.log(event.target.id)
    todoData.forEach(element => {
      if (parseInt(event.target.id) === element.id) {
        element.completed = false;
        console.log(element)
        
      }
      
    });
    
  }


  
 })

 // delete all
const deleteAllButton = document.querySelector("#deleteAllButton");
deleteAllButton.addEventListener("click", () => {
  todoData.forEach((element, index, array) => {
    if (element.completed === true) {
      
      array.splice(index, 1);
      
      printTodoList(todoData)
    };
    
  });
})

//print todo array function
const printTodoList = (arr) => {
    document.querySelector("#toDoList").innerHTML = "";
  arr.forEach((element, index) => {
    let todoList = document.querySelector("#toDoList");

    const listItem = document.createElement("li");
    todoList.appendChild(listItem);
    // Adds div tag with box class to give shape
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("box", "level");
    listItem.appendChild(itemDiv);

    //div container for left side of list
    const leftSideDiv = document.createElement("div");
    leftSideDiv.classList.add("level-left")
    itemDiv.appendChild(leftSideDiv);

    // completed checkmark
    const checkMarkLabel = document.createElement("label")
    checkMarkLabel.classList.add("checkbox","level-item")
    leftSideDiv.appendChild(checkMarkLabel);

    const checkMarkInput = document.createElement("input")
    checkMarkInput.type = "checkbox"
    checkMarkInput.setAttribute("id", `${element.id}`)
    checkMarkLabel.appendChild(checkMarkInput);



    //todo item name
    const itemName = document.createElement("h1");
    itemName.appendChild(document.createTextNode(`${element.taskName}`));
    itemName.classList.add('level-item')
    leftSideDiv.appendChild(itemName);

    //Div container for right side
    const rightSideDiv = document.createElement("div");
    rightSideDiv.classList.add("level-right")
    itemDiv.appendChild(rightSideDiv);


    //edit field
    const editField = document.createElement("input")
    editField.classList.add("input", "is-info", "level-item")
    editField.setAttribute("style", "visibility: hidden;")
    rightSideDiv.appendChild(editField);

    // Edit button added
    const editButton = document.createElement("button")
    editButton.classList.add("button", "is-info", "level-item", "editBtn")
    editButton.appendChild(document.createTextNode('edit'))
    rightSideDiv.appendChild(editButton);
    
    fullTodoList.addEventListener('click', (event) => {
      if (event.target.matches(".editBtn")) {
        editField.setAttribute("style", "visibility: visible;")
       console.log( element.id)
      }
    })

    // Delete button added
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("button", "is-danger", "level-item", "deleteBtn")
    deleteButton.setAttribute('id', index)
    deleteButton.appendChild(document.createTextNode('delete'))
    rightSideDiv.appendChild(deleteButton);
    
    
    
    

    

    console.log(element.taskName);
  });
};
printTodoList(todoData);

// const addTodo = () => {}
// const deleteTask = () => { }
// const completeTask = () => { }
// const saveTask = () => { }
// const deleteAllTask = () => { }
// const editTask = () => { }
// const editDueDate = () => { }
