const express = require("express")

const app = express()
app.use(express.urlencoded({
    extended: true
}))

app.set("view engine", "ejs")

//maandag	Monday
// dinsdag	Tuesday
// woensdag	Wednesday
// donderdag	Thursday
// vrijdag	Friday
// zaterdag	Saturday
// zondag

app.get("/", (req, res) => {

    let today = new Date()
    let currentDay = today.getDay()
    let day = ""

    switch (currentDay) {
        case 0:
            day = "ZONDAG"
            break;
        case 1:
            day = "MAANDAG"
            break;
        case 2:
            day = "DINSDAG"
            break;
        case 3:
            day = "WOENSDAG"
            break;
        case 4:
            day = "DONDERDAG"
            break;
        case 5:
            day = "VRIJDAG"
            break;
        case 6:
            day = "ZATERDAG"
            break;
        default:
            alert("SPACE AND TIME. LOG = " + currentDay)
            break;
    }

    res.render("list", {
        kindOfDay: day
    })
})


app.listen(3000, () => console.log("server UP on port 3000"))