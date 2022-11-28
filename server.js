import { v4 as uuidv4 } from 'uuid';


import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


let todoData = [
    {
      taskName: "cats",
      completed: false,
      id: uuidv4(),
      category: "exercise",
      dueDate: "dateObj",
    },
];
let categoryList = [
 
  
];


  // Sends Full todo list // works
app.get('/todos', (req, res) => {
    
    res.send(todoData)
})

// sends new todo  
app.post('/todo', (req, res) => {
     

    todoData.push(
        {
            taskName: req.body.taskName,
            completed: req.body.completed,
            id: uuidv4(),
            category: req.body.category,
            dueDate: req.body.dueDate,  
        }
    )

    
    categoryList.push(
        {
            categoryName: req.body.category,
            id: uuidv4(),
        }
    )
     console.log(todoData)
     res.sendStatus(200);
    
})

// edits todo

app.patch('/todo/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const index = todoData.findIndex((el) => el.id === id)
    todoData[index] = {
        taskName: req.body.taskName,
        completed: req.body.completed,
        id: req.body.id,
        category: req.body.category,
        dueDate: req.body.dueDate,
        
    }
})

// completed edit
app.patch('/completed/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const index = todoData.findIndex((el) => el.id === id)

    
    todoData[index] = {
        taskName: todoData[index].taskName,
        completed: req.body.completed,
        id: todoData[index].id,
        category: todoData[index].category,
        dueDate: todoData[index].dueDate,
        
    }
    // console.log(id)
    // console.log(changes)
    // console.log(todoData)

console.log(todoData)
res.sendStatus(200);

})


// delete todo
app.delete('/todo/:id', (req, res) => {

    
     const { id } = req.params
    
    console.log(id)
    function checkId(ids) {
        return ids.id == id;
    }
    
    // console.log(todoData.findIndex(checkId))
    todoData.splice(todoData.findIndex(checkId), 1)
    res.sendStatus(200);

 })


//  category endpoints
// gets full category listen
app.get('/categories', (req, res) => {
    res.send(categoryList)
 })

 // post category
app.post('/category', (req, res) => {
    if (categoryList.some(el => el.categoryName === req.body.categoryName) === false) {
  
   
    categoryList.push(
        {
            categoryName: req.body.categoryName,
            id: uuidv4(),
            
        }
        )
    }
    res.sendStatus(200);

console.log(categoryList)
    
})

app.patch('/category/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const index = todoData.findIndex((el) => el.id === id)
    todoData[index] = {
        taskName: req.body.taskName,
        completed: req.body.completed,
        id: req.body.id,
        category: req.body.category,
        dueDate: req.body.dueDate,
        
    }
})

app.delete('/category/:id', (req, res) => {
   
    console.log("test")
    const { id } = req.params
    
    
    function checkId(ids) {
        return ids.id == id;
    }
    
    // console.log(categoryList.findIndex(checkId))
    categoryList.splice(categoryList.findIndex(checkId), 1)
    res.sendStatus(200);

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  

