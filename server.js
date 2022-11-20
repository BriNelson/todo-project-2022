import express from 'express'
const app = express()
const port = 3000

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


app.get('/todos', (req, res) => {
    res.send(todoData)
})
  
app.post('/todo', (req, res) => {
    console.log(req)
    todoData.push(
        {
            taskName: "bats",
            completed: false,
            id: 1,
            category: "exercise",
            dueDate: "dateObj",  
        }
    )
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
  

