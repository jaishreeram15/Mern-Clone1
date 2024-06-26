const express = require("express")
const HomeController = require("../controller/HomeController")

const PostRouter= require("./post")()
const UserRouter=require("./user")()

function socketRoutes(io){
    io.on("connection",async (socket)=>{
        // console.log(socket.id,"socket id")
        // console.log(socket.handshake.auth,"")
        
        socket.on("loggedinUser",data=>{
            console.log(data,"from the data user ")
        })
        socket.on("JoinTheseFriendRequestroom",data=>{
            // console.log("rom list data",data.myid)
            if(data.arr ){
                data.arr.forEach(element => {
                    console.log(element,"joinedsdsa")
                    socket.join(data.myid+"friendsRequest"+element)
                });
            }
            
        })
        socket.on("helloworld",data=>{
            // console.log("hello world :: ",data)
            socket.emit("windows")
        })
        socket.on("jointheseRevievedFriendsRQ",data=>{
            // console.log(data.array,"this is 000000")
            if(data.array){
                data.array.forEach(element => {
                    // console.log(element.friendsUniqueId._id,"these are p[;'0the ")
                    // console.log("session",data.sessionid)
                    socket.join(data.sessionid+element.friendsUniqueId._id)
                    socket.to(data.sessionid+element.friendsUniqueId._id).emit("joinedforrecieved",
                    {
                        message: element.friendsUniqueId.fname +" "+element.friendsUniqueId.fname+" " +"has joined"
                    })
                });
            }
        })
        socket.on("jointheseSentFriendsRQ",data=>{
            // console.log(data.sessionid,"thiese")
            data.array.forEach(element => {
                // console.log(element._id,"these are the send")
                socket.join(element._id+data.sessionid) 
                socket.to(element._id+data.sessionid).emit("joinedforsent",{
                    message:"someone joined"
                })
            });
        })
        socket.on("joinSelf",(data)=>{
            // console.log(123,data.id)
            socket.join(data.id)
        })
        

        socket.on("addFriends",async (data)=>{
            console.log(data,"!!!!!!!!!!!!")
            
            console.log("hell world ")
            const socketids = await io.fetchSockets()
            
            console.log(socketids[0].id,"fdfdsafdsafdsafd=============================  f")
            for (let index = 0; index < socketids.length; index++) {
                console.log(" online for ou")
                console.log(45,"this is socketids[index]",socketids[index].userId)
                console.log(data.check,"!!!!! 45")
            
                if(data.check._id==socketids[index].userId){
                    console.log("yes found")
                    console.log(index)
                    io.to(socketids[index].id).emit("onlineFriends")
                    break;
                }
                
            }
        })















    })
    

    console.log("hi")
    const Router = express.Router()
    Router.use("/User",UserRouter)
    Router.use("/Post",PostRouter)
    Router.get("/home",HomeController.home)
    Router.get("/delete",HomeController.delete)
    Router.get("/",(req,res)=>{
        console.log("this is the port")
        res.send("hello")
    })
    return Router
}



module.exports=socketRoutes;