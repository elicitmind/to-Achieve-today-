const express = require("express")
const mongoose = require("mongoose")
const app = express()
const date = require(__dirname + "/date.js")
// app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))

app.set("view engine", "ejs")


// PODŁĄCZAM MONGOOSE I TWORZE DATABASE TODOLISTDB
mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const goalsSchema = new mongoose.Schema({
    name: String
})

const Goal = mongoose.model("Goal", goalsSchema)

const goal1 = new Goal({
    name: "MAGICKK"
})

const goal2 = new Goal({
    name: "PROGRAMMING, TWEET, GIT"
})

const goal3 = new Goal({
    name: "BE FEARLESS"
})

const defaultGoals = [goal1, goal2, goal3]


app.get("/", (req, res) => {
    Goal.find({}, (err, results) => {
        if (results.length === 0) {
            Goal.insertMany(defaultGoals, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("success inserting")
                }
            })
            console.log(results)
            setTimeout(() => {
                res.redirect("/");
            }, 1000)
        } else {
            let day = date.getDate()
            res.render("list", {
                listTitle: day,
                newListGoals: results
            })
        }
    })
})
///POST REQUEST Z FORMY NA STRONIE, BODY."NAME-INPUT" OZNACZA WARTOŚĆ
app.post("/", (req, res) => {
    let newGoal = req.body.newGoal
    console.log(req.body)
    if (req.body.list === "Work") {
        workGoals.push(newGoal)
        res.redirect("/work")
    } else {
        newGoals.push(newGoal)
        res.redirect("/")
    }
    // ///PO POST REQUEST WYSYŁAMY DANE(.redirect()) Z POWROTEM DO APP.GET ("/") GDZIE JE ZAPISUJEMY
    // res.redirect("/")
})

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work Goals",
        newListGoals: workGoals
    })
})

app.get("/about", (req, res) => {
    res.render("about")
})




app.listen(3000, () => console.log("server UP on port 3000"))