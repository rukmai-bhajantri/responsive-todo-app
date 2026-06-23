const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const db = require('./DbConfig')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({ message: "API WORKING" })
})

app.post('/Addlist', (req, res) => {
    const { task, Description } = req.body
    let sql = "insert into list(listname, description)values(?,?)"
    db.query(sql, [task, Description], (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database Error" })
        }
        else {
            return res.status(200).json({ message: "ADD TASK SUCESSFULY" })
        }
    })
})

app.get('/DetailsData', (req, res) => {
    let sql = "select * from list"
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database Error" })
        }
        else {
            return res.status(200).json(result)
        }
    })
})

app.delete('/removelist/:lid', (req, res) => {
    const { lid } = req.params
    let sql = "delete from list where listid=?"
    db.query(sql, [lid], (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database Error" })
        }
        else {
            return res.status(200).json({ message: "Task Deleted Successfully" })
        }
    })
})
app.put("/completelist/:id", (req, res) => {
    const id = req.params.id;

    let sql = "UPDATE list SET status=?, completed_at=NOW() WHERE listid=?";

    db.query(sql, ["Complete", id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }

        return res.status(200).json({
            message: "Task Completed Successfully"
        });
    });
});

app.listen(5000, (err) => {
    if (err) console.log(error)
    else console.log("server connectedon 5000")
})