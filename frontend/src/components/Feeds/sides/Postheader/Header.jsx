import React from "react";
import HeaderPost from "./Header.module.css"
import DisplayPicture from "../DisplayPicture";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons"
import Axios from "axios";
import { useSelector} from "react-redux"

function PostHeader({name,created,Post,media,user}){
    const {Sess}= useSelector(state=>state.custom)
    const date= new Date().getDate(created)
    const day =new Date().getDay(created)
    const month = new Date().getMonth(created)
    const year = new Date().getFullYear(created)
    function deletethisPost(){
        return <div onClick={()=>{heloDelete(Post,media)} } className={HeaderPost.CrudPost}>
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
    }
    function heloDelete(post,med){
    
        const response=Axios.get("http://localhost:5000/Post/deleteThisCloudinary?"+"post="+post+"&media="+med)
        response.then((result)=>{
            console.log(result.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    console.log()
    return <div className={HeaderPost.Header}>
        <DisplayPicture />
        <div>
            {name} <br />
            <div><p></p></div>
        </div>
        {Sess._id===user?deletethisPost():null}
    </div>
}

export default PostHeader;