import React, { useEffect, useState } from 'react';
import slidesData from '../api/SLIDE.json';

const Gallery = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const showSlide = (index) => {
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot-nav');

      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active-dot', i === index);
      });
    };

    showSlide(sliderIndex);

    const interval = setInterval(() => {
      showSlide((sliderIndex + 1) % slidesData.length);
      setSliderIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [sliderIndex]);

  const handlePrevClick = () => {
    setSliderIndex((prevIndex) => (prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setSliderIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  const handleDotClick = (index) => {
    setSliderIndex(index);
  };

  return (
    <section id="slider-container" style={{ paddingTop: "120px" }}>
      <link rel="stylesheet" type="text/css" href="/CSS/gallery.css" />
      {slidesData.map((slide, index) => (
        <div key={`slide-${index}`} className={`slide fade1 ${index === 0 ? 'active' : ''}`}>
          <div style={{ position: 'relative' }}>
            <img src={slide.url} style={{ width: '100%' }} alt={`Img ${index + 1}`} />
            <div className="text10">{slide.title}</div>
          </div>
        </div>
      ))}
      <div id="arrow-wrapper">
        <p id="arrow-prev" className="slider-arrow center_y" onClick={handlePrevClick}>&#10094;</p>
        <p id="arrow-next" className="slider-arrow center_y" onClick={handleNextClick}>&#10095;</p>
      </div>
      <div id="dots-wrapper" className="center_x" style={{ textAlign: 'center' }}>
        {slidesData.map((slide, index) => (
          <div key={`dot-${index}`} className={`dot-nav ${index === sliderIndex ? 'active-dot' : ''}`} onClick={() => handleDotClick(index)}></div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
