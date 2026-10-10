
// async function createAdminFirst(){
//    await firebase.auth().createUserWithEmailAndPassword("burger-admin@admin.com","admin1234")
//    .then(async(snap)=>{
//         await firebase.database().ref("admin").child(snap.user.uid).set({
//             name: "Admin",
//             email: "burger-admin@admin.com",
//             role: "admin",
//             password: "admin1234",
//             adminKey: snap.user.uid
//    })
//    alert("Admin Created Successfully")
//    })
// }

// createAdminFirst()


async function login(){
    
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then((snap)=>{
        localStorage.setItem("admin", true)
        localStorage.setItem("userId", snap.user.uid)
        console.log(snap.user.uid)

        window.location.href="./dashboard.html"
    })
    .catch((e)=>{
        console.log(e)
    })
}
