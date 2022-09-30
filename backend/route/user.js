const express = require("express")
const usercontroller = require("../controller/userController")  

function UserRouter(){
          
    const router = express.Router()
    router.post("/CreateUser",usercontroller.createuser)
    router.post("/login",usercontroller.LoginUser)
    router.get("/loginSesion",usercontroller.SessionCheck)
    router.post("/logout",usercontroller.logOut)
    router.patch("/UpdateInfoName/:id",usercontroller.updateName);
    router.get("/Getthedevices",usercontroller.GettheUserDevices)
    router.post("/DeviceNamestorage",usercontroller.userDeviceDetail);
    router.post("/updateProfilePicture",usercontroller.UpdateProfilePicture)
    router.post("/updatePassword",usercontroller.UpdatePassword)
    router.patch("/AddFriend/:id",usercontroller.addFriend)

    return router
}

// router.get("/logout")





module.exports= UserRouter