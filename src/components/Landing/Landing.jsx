import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";
import logo from "../../assets/logo.svg"
import 'animate.css';

export function Landing () {
    
    
    return(
    <>
    <div className={styles.container}>
     <div className={styles.containerSon}>
        <h1>Welcome to a Memory Game!</h1>
        <p> How lucky you are to find the pair of cards, try it!</p>
       
        <Link className={styles.linki} to="/home"> <button type="button" class={`btn btn-secondary ${styles.start} ${"animate__animated animate__backInUp"} `}>Start Game</button> </Link>
        
     </div>
    <div className={styles.containerBro}>
        <img  class="animate__animated animate__backInDown" src= {logo} alt="pokemon logo"/>
    </div>
    </div>
    </>
    )
    ;
}