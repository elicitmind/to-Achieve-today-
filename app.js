const express = require("express")
const mongoose = require("mongoose")
const app = express()
const date = require(__dirname + "/date.js")
const _ = require("lodash")
require('dotenv').config()
// app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))


app.set("view engine", "ejs")


// PODŁĄCZAM MONGOOSE I TWORZE DATABASE TODOLISTDB
mongoose.connect(process.env.MONGOOSE_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
const day = date.getDate()

const listSchema = {
    name: String,
    goals: [goalsSchema]
}

const List = mongoose.model("List", listSchema)


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
            res.render("list", {
                listTitle: day,
                newListGoals: results
            })
        }
    })
})
///POST REQUEST Z FORMY NA STRONIE, BODY."NAME-INPUT" OZNACZA WARTOŚĆ
app.post("/", (req, res) => {
    const newGoal = req.body.newGoal
    // console.log(req.body)
    const listName = req.body.list

    const addGoal = new Goal({
        name: newGoal
    })
    if (listName === day) {
        addGoal.save()
        res.redirect("/");

    } else {

        List.findOne({
            name: listName
        }, (err, results) => {
            console.log(listName)
            console.log(results.goals)
            console.log(newGoal)
            console.log(addGoal)




            results.goals.push(addGoal)
            results.save()

            // await results.save()


            // res.redirect("/" + listName)

            // return res.redirect("/" + listName)
            res.redirect("/" + listName)

        })


    }




    // ///PO POST REQUEST WYSYŁAMY DANE(.redirect()) Z POWROTEM DO APP.GET ("/") GDZIE JE ZAPISUJEMY
    // res.redirect("/")

})
app.get("/:customPage", (req, res) => {
    const customPage = _.capitalize(req.params.customPage)

    List.findOne({
        name: customPage
    }, async (err, results) => {
        if (!results) {
            const list = new List({
                name: customPage,
                goals: defaultGoals
            })
            await list.save()
            res.redirect("/" + customPage)
        } else {
            res.render("list", {
                listTitle: results.name,
                newListGoals: results.goals
            })
        }
    })

})

app.post("/delete", (req, res) => {
    const checkedGoalId = req.body.checkbox
    const listName = req.body.listName

    if (listName === day) {
        Goal.findByIdAndRemove(checkedGoalId, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(checkedGoalId + " removed!")
            }
        })
        res.redirect("/")
    } else {
        List.findOneAndUpdate({
                name: listName
            }, {
                $pull: {
                    goals: {
                        _id: checkedGoalId
                    }
                }
            },
            (err, results) => {
                if (!err) {
                    res.redirect("/" + listName)
                }
            })
    }
})


app.get("/about", (req, res) => {
    res.render("about")
})




app.listen(process.env.PORT, () => console.log("server UP on port 3000"))
