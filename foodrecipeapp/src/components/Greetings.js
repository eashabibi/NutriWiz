import React, { Fragment, useEffect, useState } from "react";
import GreetingImage from "../images/greetings.png";

const Greetings = () => {
  const [title, setTitle] = useState("");
  const fullTitle = "NutriWiz...";
  const delayBetweenLoops = 500;

  useEffect(() => {
    let loopInterval;

    // Function to animate the title letter by letter and then clear it
    const animateTitle = () => {
      let currentIndex = 0;
      const animationInterval = setInterval(() => {
        if (currentIndex <= fullTitle.length) {
          setTitle(fullTitle.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(animationInterval); // Stop the animation when done
          loopInterval = setTimeout(() => {
            setTitle(""); // Clear the title after a delay
            loopTitle(); // Start a new loop
          }, delayBetweenLoops);
        }
      }, 100); // Adjust the delay between letters as needed
    };

    // Function to start a new loop
    const loopTitle = () => {
      loopInterval = setTimeout(() => {
        animateTitle(); // Start the animation
      }, delayBetweenLoops);
    };

    // Display the fullTitle initially
    setTitle(fullTitle);

    // Start the initial loop when the component mounts
    loopTitle();

    return () => {
      // Cleanup if the component unmounts
      clearTimeout(loopInterval);
      setTitle(""); // Reset the title
    };
  }, []);

  return (
    <Fragment>
      <div className="greetings-container">
        <div className="title">{title}</div>
        <img src={GreetingImage} alt="Greetings" />
        <p>A HEALTHY OUTSIDE STARTS FROM THE INSIDE</p>
      </div>
    </Fragment>
  );
};

export default Greetings;
