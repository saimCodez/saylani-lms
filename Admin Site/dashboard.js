var totalStd = document.getElementById("totalstd")
var totalCourse = document.getElementById("totalCourse")
var totalQuiz = document.getElementById("totalQuiz")

async function GetAllUsers() {

    await firebase.database().ref("user").get().then((db) => {
        console.log(db.val())
        var data = Object.values(db.val())
        console.log(data.length)
        totalStd.innerText=data.length
    })
        .catch((e) => {
            console.log(e)
        })


        await firebase.database().ref("course").get().then((db) => {
        console.log(db.val())
        var data = Object.values(db.val())
        console.log(data.length)
        totalCourse.innerText=data.length
    })
        .catch((e) => {
            console.log(e)
        })


         await firebase.database().ref("Quiz").get().then((db) => {
        console.log(db.val())
        var data = Object.values(db.val())
        console.log(data.length)
        totalQuiz.innerText=data.length
    })
        .catch((e) => {
            console.log(e)
        })

}

GetAllUsers()