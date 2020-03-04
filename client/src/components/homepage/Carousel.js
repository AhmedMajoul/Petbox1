import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Col
} from 'reactstrap';

const items = [
  {
    src: 'https://img.src.ca/2013/03/19/1250x703/130319_n69tn_animaux_chien_chat_sn1250.jpg',
    altText: 'Bien venue chez PetBox',
    captionBig: 'Bien venue chez PetBox',
    captionSmall: "Icy, au Royaume des animaux, vous trouvriez tous pour votre animal de companie."
  },
  {
    src: 'https://www.la-spa.fr/sites/default/files/articles/principales/201137.jpg',
    altText: "Adopter un animal c'est sauver une vie",
    captionBig: "Adopter un animal c'est sauver une vie",
    captionSmall: "Icy, au Royaume des animaux, vous trouvriez tous pour votre animal de companie."
  },
  {
    src: 'https://www.la-spa.fr/sites/default/files/articles/principales/201137.jpg',
    altText: "Vous voulez acheter ou vendre un animal de race pure",
    captionBig: "Vous voulez acheter ou vendre un animal de race pure",
    captionSmall: "Vous etes dans le bon coin."
  },
  {
    src: 'https://i.pinimg.com/originals/a8/00/7b/a8007ba5e96c2f8570aca086d7c0f470.jpg',
    altText: "Visitez notre PetShop",
    captionBig: "Visitez notre PetShop",
    captionSmall: "Icy, vous trouviez les mailleurs affaires. N'hésitez pas à visiter notre rubrique PROMOTION !!"
  }
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem style={{width:'100%', margin:'0px', padding:'0px'}}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.altText}
      >
        <img style={{width:'100%'}} src={item.src} alt={item.altText} />
        <CarouselCaption className="text-danger" captionText={item.captionSmall} captionHeader={item.captionBig} />
      </CarouselItem>
    );
  });

  return (
    <Carousel 
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl className="text-primary" direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl className="text-primary" direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Example;