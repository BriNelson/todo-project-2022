


//Oct 7



// This server will return/update/create data at the described endpoints (URLs) for you TODO App.

// Minimum HTTP endpoints

// GET TODOS
// POST TODO
// PUT TODO (update)
// DELETE TODO
// GET ALL TODOS for a CATEGORY
// GET CATEGORIES
//  POST CATEGORIES
//  PUT CATEGORIES (update) 
// DELETE CATEGORIES
// Other Requirements

// Database NOT required
// Data kept in memory (Static Object)
// endpoints edit data in memory
// End Points are documented in APIreadme.md file
// End Points must return JSON Formatted Data


// let todoData = [
//   // {
//   //   taskName: "cats",
//   //   completed: false,
//   //   id: 1,
//   //   category: "exercise",
//   //   dueDate: "dateObj",
//   // },
// ];

let categoryList = [
 
  
];
const getTodos = async () => {
  let res = await fetch('/todos')
  let data = await res.json();

  return data
};


// console.log(todoData);

//Add todo button
const addTodoButton = document.querySelector('#addTodoButton')
let fullTodoList = document.querySelector('#toDoList');
let printedCategoryList = document.querySelector("#categoryList");
// Delete listener
fullTodoList.addEventListener('click', (event) => {
  if (event.target.matches(".deleteBtn")) {
    
    fetch('/todo' + "/" + event.target.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
        .then(res => res.json())
      .then(data => console.log(data))
    getTodos().then(todoList => {
      printTodoList(todoList);
      ;
    })
  }

  

})

printedCategoryList.addEventListener("click", (event) => {
  if (event.target.matches(".deleteCategory")) {
    categoryList.splice(event.target.id, 1);
    
    printCategories(categoryList)
   
    
  }
  console.log(event.target.id)

})




// Add todo listener

// add todo
addTodoButton.addEventListener("click", () => {
  
  // doesn't allow empty task
  if (document.querySelector("#userTask").value != '') {
    getTodos().then(todoList => {
     
      return todoList.length;
    })
    let newTask = {
        taskName: document.querySelector("#userTask").value,
      category: document.querySelector("#userCategory").value,
        
        completed: false,
        dueDate: 'test date'
    }
    
    let newCategory = {
    id: 1,
    categoryName: document.querySelector("#userCategory").value,
  }

  
    
   // Post for todo 
  fetch('/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  })
      .then(res => res.json())
    .then(data => console.log(data))
   
   
  
  // Post for category list
  fetch('/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCategory),
  })
      .then(res => res.json())
    .then(data => console.log(data))
   
   
  
  
      // Add Category

  
    
    
  // Adds category if it doesn't already exists 
  if (categoryList.some(el => el.categoryName === document.querySelector("#userCategory").value) === false) {
  

  // let newCategory = {
  //   id: categoryList.length + 1,
  //   categoryName: document.querySelector("#userCategory").value,
  // }

  getTodos().then(todoList => {
    printTodoList(todoList);
    ;
  })
    // categoryList.unshift(newCategory)
    // printCategories(categoryList)
  
}
    // todoData.unshift(newTask);
 

    // console.log(newTask);
    // printTodoList(todoData)
  }

  if (document.querySelector("#userTask").value === '') {
    alert("Your todo is empty")
  }
  
})
 

 //handles complete (uglyish)
document.addEventListener("click", function (event) {
   

  // **** might beable to do this with operands
  if (event.target.checked === true) {
    // console.log(event.target.id)
    todoData.forEach(element => {
      if (parseInt(event.target.id) === element.id) {
        element.completed = true;
        // console.log(element)
        
      }
      
    });
    countCompleted(todoData)
    
  }

  // if (event.target.checked === false) {
  //   // console.log(event.target.id)
  //   todoData.forEach(element => {
  //     if (parseInt(event.target.id) === element.id) {
  //       element.completed = false;
  //       // console.log(element)
        
  //     }
      
  //   });
  //   countCompleted(todoData)
  // }

  
})
 
 // count function
const countCompleted = (arr) => {
  document.querySelector("#completedTaskCount").innerHTML = "";
  let counter = document.querySelector("#completedTaskCount")

 let count = arr.filter(item => item.completed === true).length

  counter.appendChild(document.createTextNode(count))

    
  
  }

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

  document.querySelector("#completedTaskCount").innerHTML = "";
    document.querySelector("#toDoList").innerHTML = "";
  arr.forEach((element, index) => {
    let todoList = document.querySelector("#toDoList");

    const listItem = document.createElement("li");
    todoList.appendChild(listItem);
    // Adds div tag with box class to give shape
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("box", "level", "mt-3");
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
    if (element.completed === true) {
      checkMarkInput.setAttribute("checked", "")
    }
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

//////////////////////////////// Category section of todo list //////////////////////////////////////////////

    
  
   
    
    
// item category
    const categoryControl = document.createElement("div");
    categoryControl.classList.add("control")
      rightSideDiv.appendChild(categoryControl);
      if (element.category === ""){ categoryControl.remove()} // messy but keeps tag from repopulated on re-draw
// Bulma css tag 
    const tagsObject = document.createElement("div")
    tagsObject.classList.add("tags", "has-addons", "mr-6")
    categoryControl.appendChild(tagsObject);
// edit category on todo list
    const editCategoryButton = document.createElement("button");
    editCategoryButton.classList.add("tag", "button", "is-dark", "is-normal")
    editCategoryButton.setAttribute('id', index)
    editCategoryButton.appendChild(document.createTextNode("edit"))
    tagsObject.appendChild(editCategoryButton);
// save category on todo list
    const saveCategoryButton = document.createElement("button");
    saveCategoryButton.classList.add("tag", "button", "is-dark", "is-normal")
    saveCategoryButton.setAttribute('id', index)
    saveCategoryButton.appendChild(document.createTextNode("save"))

    
    
// title for category on todo list
    const categoryTitle = document.createElement("span")
    categoryTitle.classList.add("tag", "is-primary", "is-normal")
    tagsObject.appendChild(categoryTitle);

    const categoryTitleSpan = document.createElement("span")
    categoryTitleSpan.appendChild(document.createTextNode(`${element.category}`));
    categoryTitle.appendChild(categoryTitleSpan)
    
    // edit category field on todo list

    const editCategoryField = document.createElement("input")
    editCategoryField.classList.add("input", "is-primary", "is-small", "is-rounded")

    // delete category from todo list
    const deleteCategoryBtn = document.createElement("button")
    deleteCategoryBtn.classList.add("delete", "is-small", "deleteCategory")
    deleteCategoryBtn.setAttribute('id', index)
      categoryTitle.appendChild(deleteCategoryBtn);
      
    
    deleteCategoryBtn.addEventListener("click", (event) => {
      

      todoData[index] = {
        taskName: element.taskName,
        completed: element.completed,
        id: element.id,
        category: "",
        dueDate: element.dueDate
       
      }
      printTodoList(todoData)
      
    })

     // ─── Edit Category Listener On The Todo List Button ──────────

     
    editCategoryButton.addEventListener('click', (event) => {
      editCategoryButton.replaceWith(saveCategoryButton)
                  categoryTitleSpan.replaceWith(editCategoryField)
       
     })

   // ─── Save Category Listener ──────────────────────────────────────────

   
    saveCategoryButton.addEventListener("click", (event) => {
      // console.log(element.taskName)
      // console.log(editField.value)

      element.category = editCategoryField.value
      saveCategoryButton.replaceWith(editCategoryButton)
       
      const index = categoryList.findIndex((el) => el.id === element.id)
      console.log(index)

      categoryList[index] = {
        id: element.id,
        categoryName: editCategoryField.value

      }
      
      
      printCategories(categoryList)
      // editField.replaceWith(itemName)
      printTodoList(todoData)
      
    })


    

    ////////////////////////////////////// Edit Todo function ///////////////////////////////////////////////////

    //edit todo field 
    const editField = document.createElement("input")
    editField.classList.add("input", "is-info", "level-item")
    
    
// Save button added
const saveButton = document.createElement("button")
saveButton.classList.add("button", "is-success", "level-item", "editBtn")
    saveButton.appendChild(document.createTextNode('save')) 
    
    // Save button event for todo list - swaps save with edit button
    saveButton.addEventListener("click", (event) => {
      // console.log(element.taskName)
      // console.log(editField.value)

      element.taskName = editField.value

      saveButton.replaceWith(editButton)
      editField.replaceWith(itemName)
      printTodoList(todoData)
    })

    // Edit button for todo list added
    const editButton = document.createElement("button")
    editButton.classList.add("button", "is-info", "level-item", "editBtn")
    editButton.setAttribute('id', index)
    editButton.appendChild(document.createTextNode('edit'))
    rightSideDiv.appendChild(editButton);
    
    // Edit button event - saves edited item
    editButton.addEventListener('click', (event) => {
     editButton.replaceWith(saveButton)
        itemName.replaceWith(editField)
      
    })

    // Delete todo button added
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("button", "is-danger", "level-item", "deleteBtn")
    deleteButton.setAttribute('id', element.id)
    deleteButton.appendChild(document.createTextNode('delete'))
    rightSideDiv.appendChild(deleteButton);
    
    
    // console.log(element.taskName); 
  });
  countCompleted(arr)
};//////////////////////////////////////end of print


//////////////prints todo now
getTodos().then(todoList => {
  printTodoList(todoList);
})

// printTodoList(todoData);

////////////////// Print Category List ////////////////////////////
const printCategories = (arr) => {
  document.querySelector("#categoryList").innerHTML = "";
  document.querySelector("#categoryDropdown").innerHTML = "";
  arr.forEach((element, index) => {
    // print category tags
   
    const categoryTag = document.createElement("span");
    categoryTag.classList.add("tag", "is-primary");
    categoryTag.appendChild(document.createTextNode(element.categoryName));

    printedCategoryList.appendChild(categoryTag)
    // category tag delete
    const DeleteCategoryBtn = document.createElement("button")
    DeleteCategoryBtn.classList.add("delete", "is-small", "deleteCategory")
    DeleteCategoryBtn.setAttribute('id', index)
    categoryTag.appendChild(DeleteCategoryBtn)

    //category dropdown
    const categoryDropdown = document.querySelector("#categoryDropdown")
    const categoryOption = document.createElement("option")
    categoryOption.appendChild(document.createTextNode(element.categoryName));
    categoryDropdown.appendChild(categoryOption)

    
  
} )


}
printCategories(categoryList)

// const addTodo = () => {}
// const deleteTask = () => { }
// const completeTask = () => { }
// const saveTask = () => { }
// const deleteAllTask = () => { }
// const editTask = () => { }
// const editDueDate = () => { }
