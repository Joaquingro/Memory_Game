import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";
import { Cards } from "../Cards/Cards.jsx";
import soundOn from "../../assets/sound--on.svg";
import soundOff from "../../assets/sound--off.svg";
import soundBackground from "../../assets/background.mp3";
import { useState } from "react";


export function Home () {
    const [isSoundOn, setIsSoundOn] = useState(true);

    const toggleSound = () => {
      setIsSoundOn((prevIsSoundOn) => !prevIsSoundOn);
    };
  
    return(
    <>
    <h1>Let's Start!</h1>
    <p>To start click on a card</p>
    <div className={styles.buttons}>
        <button className = {styles.buttonSound} onClick={toggleSound}>
        {isSoundOn ? (
            <img src={soundOn} alt="Sound On" />
            ) : (
            <img src={soundOff} alt="Sound Off" />
         )}
        </button>
    </div>
    
    <Cards/>
    <Link to="/">Go back</Link>
    </>)
    ;
}