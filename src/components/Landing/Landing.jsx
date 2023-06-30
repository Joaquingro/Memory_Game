import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";
import logo from "../../assets/logo.svg"
import 'animate.css';
import { useEffect, useState } from "react";

export function Landing () {
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setAnimate(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);
    
    return(
    <>
    <div className={styles.container}>
     <div className={styles.containerSon}>
        <h1>Welcome to a Memory Game!</h1>
        <p> How lucky you are to find the pair of cards, try it!</p>
       
        <Link className={styles.linki} to="/home"> 
        <button type="button" class={`btn btn-secondary ${styles.start}  ${animate ? "animate__animated animate__backInUp" : ""} `}>Start Game</button> 
        </Link>
        
     </div>
    <div className={styles.containerBro}>
        <img  class="animate__animated animate__backInDown" src= {logo} alt="logo"/>
    </div>
    </div>
    </>
    )
    ;
}