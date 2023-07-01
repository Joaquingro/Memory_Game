import styles from "../Cards/Cards.module.css";
import moon from "../../assets/moon.svg";
import star from "../../assets/star.svg";
import sun from "../../assets/sun.svg";
import comet from "../../assets/comet.svg";
import correct from "../../assets/correct.mp3";
import incorrect from "../../assets/incorrect.mp3";
import ticking from "../../assets/ticking.mp3";

import { useEffect, useRef, useState } from "react";
import 'animate.css';
import { Modal, Toast } from "bootstrap";
import { Link } from "react-router-dom";


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
    const [endGame, setEndGame] = useState(false);
    const errorToastRef = useRef(null);
    const successToastRef = useRef(null);
    
    //<---TOAST FAIL-->
    useEffect(() => {
      if (endGame) {
        const toastElement = errorToastRef.current;
        const errorToast = new Toast(toastElement,  { autohide: false });
        errorToast.show();
      }
    }, [endGame]);

  //<--TOAST SUCCESS-->
    useEffect(() => {
      if (matchesCount === 4) {
        const toastElement = successToastRef.current;
        const successToast = new Toast(toastElement,  { autohide: false });
        successToast.show();
      }
    }, [matchesCount]);
  

//<--MODAL CONFIGURATION-->
    useEffect(() => {
      if (isMatched || isMatch) {
        const modalElement = document.getElementById('myModal');
        const modal = new Modal(modalElement, { backdrop: 'static' });
        modal.show();
  
        setTimeout(() => {
          modal.hide();
          setIsMatched(false);
          setIsMatch(false);
        }, 2000);
      }
    }, [isMatched, isMatch]);



//<--TIMER CONFIGURATION-->
  useEffect(() => {
    if (timeStatus) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      if(timer <= 10 || timer < 0){
        audioTick.play();
      }
      if(timer === 0){
        setEndGame(true);
        clearInterval(countdown);
      }
      if(matchesCount === 4){
        setTimerPaused(true);
        clearInterval(countdown);
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
    

    //<--FLIP CARDS BY CLICK FUNCTION-->
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

    //<--FLIP ALL CARDS FUNCTION-->
    const handleFlipAllCards = () => {
      setImage((prevImage) => {
        return prevImage.map((card) => {
          if (card.flipped) {
            return { ...card, flipped: false };
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
        }, 500);
      };
      
      //<--COMPARE FUNCTION-->
      const handleClickCompare = (cardId) => {
        const selectedCard = image.find((card) => card.id === cardId);
        
        if (selectedCards.some((card) => card.id === cardId)) {
          return;
        }
        
        if (selectedCards.length === 2) {
          return; 
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
            }, 1500);
          } else {
            setIsMatched(true);
            audioIncorrect.play();
            setTimeout(() => {
              resetFlippedCards();
              setIsMatched(false);
            }, 1500);
          }
      
          setSelectedCards([]);
        }
      }, [selectedCards]);
      
    //<--TIMER STOP-->
    const handleClock = () => {
      setTimeStatus(true);
    }

    //<--RESET ALL-->
    const handleReset = () => {
      shuffleImages(imageArray)
      setTimeStatus(false);
      setTimer(30);
      handleFlipAllCards();
      setEndGame(false);
      setMatchesCount(0);
      setTimerPaused(false);
    }

    
    return(
    <>
    <div  className="container text-center">
      <div className={`progress ${styles.progressBar}`}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${(timer / 30) * 100}%` }}
        aria-valuenow={timer}
        aria-valuemin="0"
        aria-valuemax="30"
      >
        {timer}s
      </div>
    </div>
        <div  className={`row row-cols-1 row-cols-sm-2 row-cols-md-4 ${styles.containerCards}`}>
        {image && image.length > 0 && image.map((card, index) => (
        <div key={index} className={`col mb-4 ${styles.column4}`}>
            
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
              <div className={`modal ${styles.modals}`} id="myModal">
                <div className={`modal-dialog modal-dialog-centered ${styles.containerModal}`}>
                  <div className={`modal-content ${styles.textModal}`}>
                    <div className="modal-body">
                      <h5>Sorry, but this is not a match</h5> 
                      </div>
                  </div>
                </div>
              </div>}
              {isMatch && 
              <div className={`modal ${styles.modals}`} id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                  <div className={`modal-content ${styles.textModal}`}>
                    <div className="modal-body">
                      <h5>Nice! it's a match</h5> 
                      </div>
                  </div>
                </div>
              </div>}
           

        {matchesCount === 4 && (
          <div className={styles.containerToast}>
          <div
          ref={successToastRef}
          className={`toast show position-absolute top-50 start-50 translate-middle ${
            matchesCount === 4 ? 'd-block' : 'd-none'
          } ${styles.toastFail}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-backdrop="static"
        >
          <div className="toast-header">
            <strong className="me-auto"><h4>Winner</h4></strong>
            
          </div>
          <div className="toast-body">
            <h5>You did it!</h5>
            <h5>Your time: {30-timer}s</h5>
          </div>
          <div>
             <button type="button" class="btn btn-primary" onClick={handleReset}>Play again</button>
          </div>
        </div>
        </div>
        )}

        {endGame && (
           <div className={styles.containerToast}>
           <div
           ref={errorToastRef}
           className={`toast show position-absolute top-50 start-50 translate-middle ${
             endGame ? 'd-block' : 'd-none'
           } ${styles.toastFail}`}
           role="alert"
           aria-live="assertive"
           aria-atomic="true"
           data-backdrop="static"
         >
           <div className="toast-header">
             <strong className="me-auto"><h4>Time is over</h4></strong>
             
           </div>
           <div className="toast-body">
             <h5>Oops you didn't find them all!</h5>
           </div>
           <div>
              <button type="button" className="btn btn-primary" onClick={handleReset}>Play again</button>
           </div>
         </div>
         </div>
        )}
    </div>
    </div>
    </>
    );
}