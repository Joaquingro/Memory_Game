import styles from "../Cards/Cards.module.css";
import moon from "../../assets/moon.svg";
import star from "../../assets/star.svg";
import sun from "../../assets/sun.svg";
import comet from "../../assets/comet.svg";
import correct from "../../assets/correct.mp3";
import incorrect from "../../assets/incorrect.mp3";

import { useEffect, useState } from "react";
import 'animate.css';


export function Cards(){
    const [flippedCards, setFlippedCards] = useState([]);
    const [isMatched, setIsMatched] = useState(false);
    const [isMatch, setIsMatch] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [image, setImage] = useState([]);
    const audioCorrect = new Audio(correct);
    const audioIncorrect = new Audio(incorrect);

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
        
        setImage(imageArray)
        shuffleImages(imageArray);
    }, [])
    
    const shuffleImages = (images) => {
        const shuffledImages = [...images];
        for (let i = shuffledImages.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
        }
        setImage(shuffledImages);
        setFlippedCards([]);
      };

    const handleFlip = (cardId) => {
        // if (flippedCards.includes(cardId) || flippedCards.length === 2) {
        //     return; 
        //   }
         

        setImage((prevImage) => {
            return prevImage.map((card) => {
              if (card.id === cardId) {
                return { ...card, flipped: true };
              }
              return card;
            });
          });
    }
   
    const resetFlippedCards = () => {
        setTimeout(() => {
            setImage((prevImage) => {
              const updatedImage = [...prevImage];
              selectedCards.forEach((selectedCard) => {
                const index = updatedImage.findIndex((card) => card.id === selectedCard.id);
                if (index !== -1) {
                  updatedImage[index] = { ...updatedImage[index], flipped: false };
                }
              });
              return updatedImage;
          });
          setSelectedCards([]);
        }, 1000);
      };
      
    const handleClickCompare = (cardId) => {
        const selectedCard = image.find((card) => card.id === cardId);
        
        if (selectedCards.some((card) => card.id === cardId)) {
          return; 
        }
        setSelectedCards((prevSelectedCards) => [...prevSelectedCards, selectedCard]);
        console.log(selectedCards);
        
        if (selectedCards.length === 1) {
          const firstCard = selectedCards[0];
          if (firstCard.id !== selectedCard.id && firstCard.img === selectedCard.img) {
            
           setIsMatch(true);
           audioCorrect.play();
           setTimeout(() => {
                setIsMatch(false);
           }, 2000);
          } else {
            setIsMatched(true);
            audioIncorrect.play();
            setTimeout(() => {
                setIsMatched(false);
                resetFlippedCards();
                
           }, 1000);
        }
    }
         
    }

    return(
    <>
    <div  className="container text-center">
        <div  className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {image && image.length > 0 && image.map((card, index) => (
        <div key={index} className="col mb-4">
            
                {card.flipped ? 
                <div className={`card ${styles.cardContainerFront} ${card.flipped ? styles['flip-in-up'] : ''}`}>
                    <div id = {index} className={`card-front ${styles.cardFront}` } >
                        <img src={card.img} className="card-img-top" alt="card"/>
                        <p>{card.text}</p>
                    </div>
                </div> : 
                <div className={`card ${styles.cardContainerBack} ${card.flipped ? styles['flip-out-up'] : ''}`} onClick={() => {
                    handleFlip(card.id)
                    handleClickCompare(card.id)
                    }}>
                    <div className={`card-back ${styles.cardBack} `} >
                        <h1>?</h1>
                    </div>
                </div>}
               
        </div>
        
        ))}
        {isMatched && 
            <div>
                <h3>Sorry, but this is not a match</h3>
            </div>
        }
        {isMatch && 
            <div>
                <h3>Nice! it's a match</h3>
            </div>
        }
    </div>
    </div>
    </>
    );
}