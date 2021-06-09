const express = require("express")

const app = express()
const date = require(__dirname + "/date.js")
// app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))

app.set("view engine", "ejs")

let newGoals = ["Learn Programming", "magickkk", "HIGH VALUE MAN", "Breathe", "Eat Well"]
let workGoals = []


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