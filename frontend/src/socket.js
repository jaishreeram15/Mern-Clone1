import io from "socket.io-client"
const socket=io("http://localhost:5000",{autoConnect:false})



export default socket