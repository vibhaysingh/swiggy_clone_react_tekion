import React, { useState } from 'react';
import foodImage from "../../assets/images/food5.png";
import styles from "./Caraousel.module.css";

function Caraousel() {
    const [currPixel, setCurrentPixel] = useState(0);
    const [counter, setCounter] = useState(-1);
    const [displayLeftArrow, setdisplayLeftArrow] = useState('hidden')
    const [displayRightArrow, setdisplayRightArrow] = useState('visible')
    const caraouselImages = [foodImage, foodImage, foodImage, foodImage, foodImage, foodImage];
    function handleLeftShift() {
        if (counter >= 0) {
            setdisplayRightArrow('visible')
            setCurrentPixel((prevPixel) => prevPixel - 317)
            setCounter((prevCounter) => prevCounter - 1)
            if (counter === 0) {
                setdisplayLeftArrow('hidden')
            }
        }
    }
    const handleRightShift = () => {
        if (counter < caraouselImages.length - 4) {
            setdisplayLeftArrow('visible');
            setCurrentPixel((prevPixel) => prevPixel + 317);
            setCounter((prevCounter) => prevCounter + 1);
            if (counter === caraouselImages.length - 5) {
                setdisplayRightArrow('hidden');
            }
        }
    }

    return (
        <div className={styles.caraouselContainer}>
            <div className={styles.sliderContainer}>
                <div className={styles.sliderWidth}>
                    {caraouselImages.map((foodImage, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.item}>
                                <img
                                src={foodImage} alt=""
                                style={{ right: `${currPixel}px` }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div
                className={styles["leftArrowContainer"]}
                onClick={handleLeftShift}
                style={{visibility: `${displayLeftArrow}`}}
            >
                &larr;
            </div>

            <div
                className={styles["rightArrowContainer"]}
                onClick={handleRightShift}
                style={{visibility: `${displayRightArrow}`}}
            >
                &rarr;
            </div>
        </div>
    )
}
export default Caraousel