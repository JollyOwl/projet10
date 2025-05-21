import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {

  /* 1. ÉTATS */
  // Récupération des données
  const { data } = useData();
  // État de l'index du slide actif
  const [index, setIndex] = useState(0);

  /* 2. CALCULS BASÉS SUR LES DONNEES RECUPEREES */
  // Fonction pour renvoyer un tableau d'événements triés par date décroissante
  const sortEventsByDate = (events) => {
    if (!events) return [];
    // Si B est supérieur à A, alors B est avant A / Si A est supérieur à B, alors A est avant B
    return events.sort((eventA, eventB) => {
      const dateA = new Date(eventA.date);
      const dateB = new Date(eventB.date);
      return dateB - dateA;
    });
  };

  // Application du tri sur les événements #focus
  const sortedEvents = sortEventsByDate(data?.focus);

  /* 3. GESTIONNAIRES D'ÉTAT */
  // Gestion du changement des radio buttons
  const handleRadioChange = (radioIndex) => {
    setIndex(radioIndex);
  };

  // Gestion du défilement automatique grâce à l'index
  const nextCard = () => {
    // Si il n'y a pas d'événements ou que le tableau est vide, on ne fait rien
    if (!sortedEvents || sortedEvents.length === 0) {
      return; 
    }
    let nextIndex;

   // Si on est au dernier slide, on retourne au premier
    if (index === sortedEvents.length - 1) {
      nextIndex = 0;
    } else {
    // Sinon, on passe au slide suivant
      nextIndex = index + 1;
    }
    // Met à jour l'index
    setIndex(nextIndex);
  };

  // Effet pour le défilement automatique
  useEffect(() => {
    const timeoutId = setTimeout(nextCard, 5000);
    return () => clearTimeout(timeoutId); // Nettoyage du timeout
  }, [index, sortedEvents]);

  /* 4. RENDU */
  return (
    <div className="SlideCardList">
      {/* Slides */}
      {sortedEvents.map((event, idx) => {
        // comparaison entre le slide actif (index pour useState) et la position de ce slide dans le tableau (idx pour .map)
        // si l'index est égal à l'index du slide, le slide est visible, sinon il est caché
        const isActive = index === idx;
        // Définit la classe en fonction de l'état
        const slideClass = isActive ? "SlideCard--display" : "SlideCard--hide";

        return (
          <div
            key={event.id}
            className={`SlideCard ${slideClass}`}
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
        );
      })}

      {/* Pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedEvents.map((event, idx) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => handleRadioChange(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;