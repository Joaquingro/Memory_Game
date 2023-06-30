import styles from "../Cards/Cards.module.css";
import moon from "../../assets/moon.svg";
import star from "../../assets/star.svg";
import sun from "../../assets/sun.svg";
import comet from "../../assets/comet.svg";
import correct from "../../assets/correct.mp3";
import incorrect from "../../assets/incorrect.mp3";
import ticking from "../../assets/ticking.mp3";

import { useEffect, useState } from "react";
import 'animate.css';


export function Cards(){
    const [isMatched, setIsMatched] = useState(false);
    const [isMatch, setIsMatch] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [image, setImage] = useState([]);
    const audioCorrect = new Audio(correct);
    const audioIncorrect = new Audio(incorrect);
    const audioTick = new Audio(ticking);
    const [timer, setTimer] = useState(30);
    const [timeStatus, setTimeStatus] = useState(false);
    const [matchesCount, setMatchesCount] = useState(0);
    const [isTimerPaused, setTimerPaused] = useState(false);
    


  useEffect(() => {
    if (timeStatus) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      if(timer <= 10 || timer < 0){
        audioTick.play();
      }
      if(timer === 0){
        clearInterval(countdown);
      }
      if(matchesCount === 4){
        setTimerPaused(true);
      }
      if (isTimerPaused) {
        clearInterval(countdown); 
      }
      return () => {
        clearInterval(countdown);
      };
    }
  }, [timeStatus, timer]);

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

    //<--SORT CARDS IN HOME-->
    const shuffleImages = (images) => {
      const shuffledImages = [...images];
      shuffledImages.sort(() => Math.random() - 0.5);
      setImage(shuffledImages);
    };
    
    //<--FLIP CARDS FUNCTION-->
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
   //<--FLIPPED CARDS IF NOT COINCIDENCE FUNCTION-->
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
      
      //<--COMPARE FUNCTION-->
      const handleClickCompare = (cardId) => {
        const selectedCard = image.find((card) => card.id === cardId);
        
        if (selectedCards.some((card) => card.id === cardId)) {
          return;
        }
        
        if (selectedCards.length === 2) {
          return; // Ya se han seleccionado dos cartas, no permitir más selecciones
        }

        setSelectedCards((prevSelectedCards) => [...prevSelectedCards, selectedCard]);
      };
      
      useEffect(() => {
        if (selectedCards.length === 2) {
          const [firstCard, secondCard] = selectedCards;
      
          if (firstCard.id !== secondCard.id && firstCard.img === secondCard.img) {
            setIsMatch(true);
            audioCorrect.play();
            setMatchesCount((prevMatchesCount) => prevMatchesCount + 1);
            setTimeout(() => {
              setIsMatch(false);
            }, 2000);
          } else {
            setIsMatched(true);
            audioIncorrect.play();
            setTimeout(() => {
              resetFlippedCards();
              setIsMatched(false);
            }, 1000);
          }
      
          setSelectedCards([]);
        }
      }, [selectedCards]);
      
    const handleClock = () => {
      setTimeStatus(true);
    }

    return(
    <>
    <div  className="container text-center">
      <p>Timer: {timer}</p>
      <audio ref={audioTick} src={ticking} loop={true} />
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
                    handleClock()
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

        {matchesCount === 4 && "You did it"}
    </div>
    </div>
    </>
    );
}