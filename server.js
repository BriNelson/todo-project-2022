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
    console.log(req)
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
     console.log(todoData)
     res.sendStatus(200);
    
})

app.delete('/todo/:id', (req, res) => {

    
     const { id } = req.params
    
    console.log(id)
    function checkId(ids) {
        return ids.id == id;
    }
    
    console.log(todoData.findIndex(checkId))
    todoData.splice(todoData.findIndex(checkId), 1)
    res.sendStatus(200);

 })


//  category endpoints
// gets full category listen
app.get('/categories', (req, res) => {
    res.send(categoryList)
 })

app.post('/category', (req, res) => {
    console.log(req.body)
    categoryList.push(
        {
            categoryName: req.body.categoryName,
            id: uuidv4(),
            
        }
    )
    res.sendStatus(200);


    
})

app.delete('/category', (req, res) => {})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  

