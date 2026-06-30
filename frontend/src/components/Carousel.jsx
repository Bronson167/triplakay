import React, { useContext, useEffect, useState } from "react";
import { CourseContext} from '../context/CourseContext';

const CarouselComponent = () => {
  const { slides } = useContext(CourseContext);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden h-[300px] sm:h-[500px] z-0">
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Desktop image */}
            <img
              src={slide.imageDesktop || slide.imageMobile}
              alt={`Slide ${index + 1} Desktop`}
              className="hidden sm:block w-full h-full object-cover object-center"
            />
            {/* Mobile image */}
            <img
              src={slide.imageMobile || slide.imageDesktop}
              alt={`Slide ${index + 1} Mobile`}
              className="sm:hidden w-full h-full object-cover object-center"
            />

            {(slide.title || slide.desc) && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-80 px-4 py-3 rounded-md w-[90%] sm:w-auto">
                {slide.title && <h2 className="text-lg sm:text-2xl font-bold">{slide.title}</h2>}
                {slide.desc && <p className="text-xs sm:text-sm">{slide.desc}</p>}
              </div>
            )}
          </div>
        );
      })}

      {/* Indicateurs */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
