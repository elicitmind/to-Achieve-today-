const express = require("express")

const app = express()
// app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.set("view engine", "ejs")

var newGoals = ["Learn Programming", "Kybalion", "Keep the Sigma State", "Breathe", "Eat Well"]


app.get("/", (req, res) => {

    var today = new Date()

    var options = {
        day: "numeric",
        weekday: "long",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options)

    res.render("list", {
        kindOfDay: day,
        newListGoals: newGoals
    })
})
///POST REQUEST Z FORMY NA STRONIE, BODY."NAME-INPUT" OZNACZA WARTOŚĆ
app.post("/", (req, res) => {
    var newGoal = req.body.newGoal
    newGoals.push(newGoal)
    console.log(newGoal)
    ///PO POST REQUEST WYSYŁAMY DANE(.redirect()) Z POWROTEM DO APP.GET ("/") GDZIE JE ZAPISUJEMY
    res.redirect("/")
})



app.listen(3000, () => console.log("server UP on port 3000"))