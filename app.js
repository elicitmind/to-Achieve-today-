const express = require("express")

const app = express()
app.use(express.urlencoded({
    extended: true
}))



app.get("/", (req, res) => {

    let today = new Date()
    let currentDay = today.getDay()

    if (currentDay === 6 || currentDay === 0) {
        res.sendFile(__dirname + "/index.html")
    } else {
        res.send("<h1>Witam Cię.</h2>")
    }
})


app.listen(3000, () => console.log("server UP on port 3000"))