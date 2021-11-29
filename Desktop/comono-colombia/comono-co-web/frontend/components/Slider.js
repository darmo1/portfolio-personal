import * as React from "react";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CardEmployee from '../components/CardEmployee'



const Slider = ({ dataSlides }) => {

  const  { locale }  = useRouter();
  const Slides = locale === 'es-CO' ? dataSlides['es-CO'] : dataSlides['en-US'];

  return(
    <Carousel 
    dynamicHeight={false}  
    showThumbs={false}
    infiniteLoop={true}
    showStatus={false}
    showArrows={true}
    autoPlay={false}
    stopOnHover={true}
    swipeable={true}
    interval={10000000}
    >
      {
        Slides.sort((a, b) => a.order - b.order).map((slide, index) => {
          return <CardEmployee employee={slide }  index={index}  />
        })
      }
    </Carousel>
  )
  
};

export default Slider;
