import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  console.log("Slider data", data);
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) - new Date(evtB.date)
  );

  const nextCard = () => {
    const timeoutId = setTimeout(() => {
      if (byDateDesc && byDateDesc.length > 0) {
        setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
      }
    }, 5000);
    return timeoutId;
  };

  useEffect(() => {
    const timeoutId = nextCard();
    return () => clearTimeout(timeoutId); // Fonction de nettoyage
  }, [index]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id}  // Utilisation de event.id comme clé unique
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          {console.log("event id : ", event.id)}
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event) => (
            <input
              key={event.id}  // Utilisation de event.id comme clé unique pour les radios
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default Slider;