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
      id: 1,
      category: "exercise",
      dueDate: "dateObj",
    },
  ];


  // Sends Full todo list // works
app.get('/todos', (req, res) => {
    res.send(todoData)
})

  
app.post('/todo', (req, res) => {
     console.log(req.body)

    todoData.push(
        {
            taskName: req.body.taskName,
            completed: req.body.completed,
            id: req.body.id,
            category: req.body.category,
            dueDate: req.body.dueDate,  
        }
    )
     console.log(todoData)
     res.send(todoData)
    
})

app.delete('/todo', (req, res) => {})

app.get('/categories', (req, res) => { })

app.post('/category', (req, res) => {
    
})

app.delete('/category', (req, res) => {})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  

