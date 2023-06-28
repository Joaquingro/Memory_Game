import { Link } from "react-router-dom";
import styles from "../Home/Home.module.css";
import { Cards } from "../Cards/Cards.jsx";


export function Home () {
   
    return(
    <>
    <h1>Let's Start!</h1>
    <p>To start click on a card</p>
    <Cards/>
    <Link to="/">Go back</Link>
    </>)
    ;
}