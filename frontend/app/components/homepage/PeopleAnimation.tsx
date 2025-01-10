import { useEffect, useRef, useState } from "react";

const PeopleAnimation = () => {
  const scale = useRef(1.2);
  const lastScrollY = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animatePeople = (direction: string) => {
    const people = document.querySelector<HTMLElement>(".people");
    if (!people) return;

    setIsAnimating(true);

    const interval = setInterval(() => {
      let newScale = scale.current;
      console.log("Current scale:", newScale);

      // Adjust scale based on direction
      if (direction === 'down' && newScale > 1) {
        newScale = Math.min(newScale - 0.01, 1); // Decrement scale down to 1
        console.log("new scale:", newScale);
      } else if (direction === 'up' && newScale < 1.2) {
        newScale = Math.max(newScale + 0.01, 1.2); // Increment scale up to 2
      }

      scale.current = newScale;

      // Update the infographic scale
      people.style.transform = `scale(${newScale}) translate(0px, 20px)`;

      // Stop animation 
      if (newScale === 1 || newScale === 1.2) {
        clearInterval(interval);
        setIsAnimating(false); // Reset animation state
      }
    }, 16); // Adjust the interval speed
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const animationTrigger = document.getElementById("animation-trigger");
      const people = document.querySelector<HTMLElement>(".people");

      if (!people) return;
      if (!animationTrigger) return;

      const rect = animationTrigger.getBoundingClientRect();
      // Scrolling down
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        people.style.transform = "scale(1) translate(40px, 50px)";
        people.style.transition = "transform 0.5s ease";
      } else {
        people.style.transform = "scale(1.2) translate(-40px, 50px)";
        people.style.transition = "transform 0.5s ease";
      }

      // if (currentScrollY > lastScrollY.current && scale.current > 1 && !isAnimating) {
      //   animatePeople('down');
      // }
      // // Scrolling up
      // else if (currentScrollY < lastScrollY.current && scale.current < 1.2 && !isAnimating) {
      //   animatePeople('up');
      // }

      // lastScrollY.current = currentScrollY // Update Y position ref;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scale, isAnimating]);

  return (
    <div>
      <img className="people" src="/images/people-infographic.svg" alt="an infographic of people"></img>
    </div>
  )
};

export default PeopleAnimation;