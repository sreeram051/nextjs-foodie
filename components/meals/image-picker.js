"use client"
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image';


export default function ImagePicker({label , name}) {
    const [imagePicked , setImagePicked] = useState();
    const imageInput =  useRef();
    function handleClick() {
        imageInput.current.click();
    }

    function handleImage(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImagePicked(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    
    
    return (
        <div className={ classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!imagePicked && <p>Please pick an image</p>}
                    {imagePicked && <Image src={imagePicked} alt='An image' fill />}
                </div>
                <input
                className={classes.input} 
                type="file" 
                id={name}
                name={name} 
                accept="image/png , image/jpeg"
                ref={imageInput}
                onChange={handleImage}
                />
            <button className={classes.button} type='button' onClick={handleClick}> Pick an image</button>
            </div>
        </div>
    )
}