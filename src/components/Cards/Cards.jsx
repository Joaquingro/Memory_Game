import styles from "../Cards/Cards.module.css";
import moon from "../../assets/moon.svg";
import star from "../../assets/star.svg";
import sun from "../../assets/sun.svg";
import comet from "../../assets/comet.svg";
import { useEffect, useState } from "react";

export function Cards(){
    const [image, setImage] = useState([]);
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        const imageArray = [moon, star, sun, comet];
        const doubledImages = [...imageArray, ...imageArray];
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

    const handleFlip = () => {
        setFlip(true)
    }
   

    return(
    <>
    <div  className="container text-center">
        <div  className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {image && image.length > 0 && image.map((img, index) => (
        <div key={index} className="col mb-4">
            
                {flip ? 
                <div className={`card ${styles.cardContainerFront}`}>
                    <div className="card-front">
                        <img src={img} className="card-img-top" alt="card"/>
                    </div>
                </div> : 
                <div className={`card ${styles.cardContainerBack}`}>
                    <div className={`card-back ${styles.cardBack}`} onClick={handleFlip}>
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