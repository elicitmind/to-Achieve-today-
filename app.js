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

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})

const itemsSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", itemsSchema)

app.get("/", (req, res) => {

    let day = date.getDate()
    res.render("list", {
        listTitle: day,
        newListGoals: newGoals
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
}
)




app.listen(3000, () => console.log("server UP on port 3000"))