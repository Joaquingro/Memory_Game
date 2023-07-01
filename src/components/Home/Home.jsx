import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";
import { Cards } from "../Cards/Cards.jsx";
import soundOn from "../../assets/sound--on.svg";
import soundOff from "../../assets/sound--off.svg";
import soundBackground from "../../assets/background.mp3";
import React, { useEffect, useRef, useState } from "react";


export function Home () {
    const [isSoundOn, setIsSoundOn] = useState(true);
    const audioRef = React.createRef(new Audio(soundBackground));

    useEffect(() => {
    const audio = audioRef.current;
        if (isSoundOn) {
             audio.play(); 
        } else {
            audio.pause(); 
        }
    }, [isSoundOn])
    
  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };



    return(
    <div className={styles.container}>
    <h1>Let's Start!</h1>
    <p className={styles.p}>To start <strong>click</strong> on a card</p>
    <div className={styles.buttons}>
        <button className = {styles.buttonSound} onClick={toggleSound}>
        <audio ref={audioRef} src={soundBackground} loop={true} />
        {isSoundOn ? (
            <img src={soundOn} alt="Sound On" />
            ) : (
            <img src={soundOff} alt="Sound Off" />
         )}
        </button>
    </div>
    
    <Cards/>
    
    </div>)
    ;
}