import { useEffect, useRef, useState } from "react";

const PieAnimation = () => {
    const percentage = useRef(40);
  const lastScrollY = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animatePie = (direction: string) => {
    const pie = document.querySelector<HTMLElement>(".pie");
    if (!pie) return;

    setIsAnimating(true);

    const interval = setInterval(() => {
      let newPercentage = percentage.current;

      // Adjust percentage based on direction
      if (direction === 'down' && newPercentage < 78) {
        newPercentage = Math.min(newPercentage + 1, 78); // Increment percentage up to 78
      } else if (direction === 'up' && newPercentage > 40) {
        newPercentage = Math.max(newPercentage - 1, 40); // Decrement percentage down to 40
      }

      percentage.current = newPercentage;

      // Update the pie chart background
      pie.style.background = `conic-gradient(#2252b2 0% ${newPercentage}%, rgba(255, 255, 255, 0) ${newPercentage}%)`;

      // Stop animation 
      if (newPercentage === 40 || newPercentage === 78) {
        clearInterval(interval);
        setIsAnimating(false); // Reset animation state
      }
    }, 30); // Adjust the interval speed
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Scrolling down
      if (currentScrollY > lastScrollY.current && percentage.current < 78 && !isAnimating) {
        animatePie('down');
      }
      // Scrolling up
      else if (currentScrollY < lastScrollY.current && percentage.current > 40 && !isAnimating) {
        animatePie('up');
      }

      lastScrollY.current = currentScrollY // Update Y position ref;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [percentage, isAnimating]);
  
    return (
        <div className="pieContainer">
        <div className="pieBackground"><img src="/images/globe.png" alt="a globe"></img></div>
        <div className="global_data">
          <div id="global" className="hold"><div className="pie"></div></div>
        </div>
      </div>
    )           
};

export default PieAnimation;