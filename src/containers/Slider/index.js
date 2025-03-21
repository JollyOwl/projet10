import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  // Gestion du changement de slide manuel
  const handleRadioChange = (radioIndex) => {
    setIndex(radioIndex);
  };

  // Gestion du défilement automatique
  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0) {
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    }
  };

  // Effet pour le défilement automatique
  useEffect(() => {
    const timeoutId = setTimeout(nextCard, 5000);
    return () => clearTimeout(timeoutId);
  }, [index, byDateDesc]);

  // Si pas de données, afficher un message
  if (!byDateDesc || byDateDesc.length === 0) {
    return <div className="SlideCardList">Aucun événement disponible</div>;
  }

  return (
    <div className="SlideCardList">
      {/* Cartes de slides */}
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, idx) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => handleRadioChange(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;