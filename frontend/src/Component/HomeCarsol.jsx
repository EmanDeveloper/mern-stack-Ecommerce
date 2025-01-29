import { useState, useEffect } from "react";
import carsol1 from "../assets/iphone1e6.png";
import carsol2 from "../assets/zfold.avif";
import carsol3 from "../assets/Google.webp";
import carsol4 from "../assets/galaxys24.jpg";

function HomeCarsol() {
  const slides = [carsol1, carsol2, carsol3, carsol4];
  const [currentSlide, setCurrentSlide] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); 
    return () => clearInterval(interval); 
  }, [slides.length]);

  return (
    <div className="relative w-full h-auto bg-gray-100 py-2 ">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-item absolute w-full top-0  transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-80 object-cover" />
        </div>
      ))}
    </div>
  );
}

export default HomeCarsol;
