import styles from "../Cards/Cards.module.css";
import moon from "../../assets/moon.svg";
import star from "../../assets/star.svg";
import sun from "../../assets/sun.svg";
import comet from "../../assets/comet.svg";
import { useEffect, useState } from "react";
import 'animate.css';


export function Cards(){
    const [image, setImage] = useState([]);
    const imageArray = [
        { id: 1, img: moon, flipped: false, text: "The moon" },
        { id: 2, img: star, flipped: false, text: "The star" },
        { id: 3, img: sun, flipped: false, text: "The sun" },
        { id: 4, img: comet, flipped: false, text: "The comet" },
        { id: 5, img: moon, flipped: false, text: "The moon" },
        { id: 6, img: star, flipped: false, text: "The star" },
        { id: 7, img: sun, flipped: false, text: "The sun" },
        { id: 8, img: comet, flipped: false, text: "The comet" }
    ];


    useEffect(() => {
        const doubledImages = [...imageArray];
        setImage(doubledImages)
        shuffleImages(doubledImages);
    }, [])
    
    const shuffleImages = (images) => {
        const shuffledImages = [...images];
        for (let i = shuffledImages.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
        }
        setImage(shuffledImages);
      };

    const handleFlip = (cardId) => {
        setImage((prevImage) => {
            return prevImage.map((card) => {
              if (card.id === cardId) {
                return { ...card, flipped: true };
              }
              return card;
            });
          });
    }
   

    return(
    <>
    <div  className="container text-center">
        <div  className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {image && image.length > 0 && image.map((card, index) => (
        <div key={index} className="col mb-4">
            
                {card.flipped ? 
                <div className={`card ${styles.cardContainerFront} ${card.flipped ? styles['flip-in-up'] : ''}`}>
                    <div id = {index} className={`card-front ${styles.cardFront}`}>
                        <img src={card.img} className="card-img-top" alt="card"/>
                        <p>{card.text}</p>
                    </div>
                </div> : 
                <div className={`card ${styles.cardContainerBack} ${card.flipped ? styles['flip-out-up'] : ''}`} onClick={() => handleFlip(card.id)}>
                    <div className={`card-back ${styles.cardBack} `} >
                        <h1>?</h1>
                    </div>
                </div>}
               
                 
            
        </div>
        
        ))}
    </div>
    </div>
    </>
    );
}