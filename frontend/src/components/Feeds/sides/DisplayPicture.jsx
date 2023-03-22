import React from "react";
import DisplayPictureCSS from "./displayPicture.module.css"
import {useSelector} from "react-redux"

function DisplayPicture({name,pic}){
    const {Sess} = useSelector(state=>state.custom)
        // console.log(props)
        // console.log(Sess)
    let srces
    console.log(pic,"this is pic")
    if(pic){
         srces =pic    
    }
    else{
         srces =  Sess.displayPicture?Sess.displayPicture:Sess.gender=="female"?"https://res.cloudinary.com/dyjngm7az/image/upload/v1675399762/mshrr4fhso1vb297gudc.jpg":"https://res.cloudinary.com/dyjngm7az/image/upload/v1675411886/o3ivfsxthk04vwxaik8j.jpg"
    }


    // 
    return <div className={DisplayPictureCSS.containerDIV}>
        <img src={srces} ref={name} className={DisplayPictureCSS.image}/>
    </div>
}

export default DisplayPicture;