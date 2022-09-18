import React from "react";
import { useRef } from "react";
import updateDPCss from "./updateProfilePic.module.css"
import Cropper from "react-easy-crop"
import { useState } from "react";
import {useDispatch} from "react-redux"
import {generateDownload} from "./cropImage";

function CropperReact(){
    const dispatch=useDispatch()
    const [image,setimage]=useState(null)
    const [croppeArea,setCroppeArea]=useState(null)
    const [crop,setCrop]=useState({x:0,y:0})
    const [zoom,setZoom]=useState(1)
    const chooseFile=useRef();
    const [objectssxios,setobjectssxios]=useState(null);
    function ChooseClicked(){
        chooseFile.current.click()
    }
    const oncropComplete=(CroppeAreapercentage,cropareapixels)=>{
        setCroppeArea(cropareapixels)
    }
    const onselectafile=(e)=>{
        if(e.target.files[0]){
            const reader= new FileReader(e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load",()=>{
                // console.log(reader.result)
                console.log("fdsafdsafd")
                setimage(reader.result)
            })
        }
    }
    function triggerRange(e){
        console.log(e.target.value)
        setZoom(e.target.value)
        console.log("change")
    }
    async function  download (){
        generateDownload(image,croppeArea,setobjectssxios)
    }
    function hidetheComponent(eve){
        setimage(false)
    }
    if(objectssxios){
        console.log(objectssxios.secure_url)
        dispatch({
            type:"Displaypicture",
            payload:objectssxios.secure_url
        })
    }
    else{
        console.log("not found")
    }

    return <div className={updateDPCss.container}>
        <div className={updateDPCss.containerCropper}>
            {image&&<Cropper className={updateDPCss.cropper} image={image} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onCropComplete={oncropComplete} onZoomChange={setZoom}/>}
        </div>
        <div className={updateDPCss.containerButton}>
            <input onChange={onselectafile} type="file" name="" accept="image/" ref={chooseFile} style={{display:"none"}}/>
            <input type="range" onChange={(e)=>{triggerRange(e)}} min={0} max={3}/>
            <button onClick={(e)=>{ChooseClicked(e)}} >choose</button>
            <button onClick={download}>download</button>
            <button onClick={(e)=>{hidetheComponent()}}> cancel</button>
        </div>
        <img src="" id="myimage" alt="" />
    </div>
}


export default CropperReact;