//ROBIMY MODUŁY
const today = new Date()

exports.getDate = () => {
const options = {
    day: "numeric",
    weekday: "long",
    month: "long"
}

return today.toLocaleDateString("en-US", options)
}

exports.getDay = () => {
    const options = {
        weekday: "long"
    }
    
    return today.toLocaleDateString("en-US", options)
    }

//PRZED REFACTORING
// module.exports.getDate = getDate

// function getDate() {
// let today = new Date()

// let options = {
//     day: "numeric",
//     weekday: "long",
//     month: "long"
// }

// return today.toLocaleDateString("en-US", options)
// return day
// }