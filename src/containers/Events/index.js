import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {

  /* 1. ÉTATS */
  // Récupération des données
  const { data, error } = useData();
  // État du filtre, par défaut le filtre est vide
  const [type, setType] = useState("");
  // État de la pagination
  const [currentPage, setCurrentPage] = useState(1);
  // État de la modal, par défaut la modal est fermée
  const [modalEventId, setModalEventId] = useState(null);

  /* 2. GESTIONNAIRES D'ÉTAT */
  // Gestion de la pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Gestion du filtre
  const handleTypeChange = (newType) => {
    setType(newType);
    setCurrentPage(1); // Réinitialise la pagination lors du changement de filtre
  };
  // Gestion de la modal
  const handleEventClick = (eventId) => {
    setModalEventId(eventId);
  };
  const handleCloseModal = () => {
    setModalEventId(null);
  };

  /* 3. CALCULS BASÉS SUR L'ÉTAT */
  // Gestion des erreurs et chargement
  if (error) {
    return <div>An error occured</div>;
  }
  if (!data || !data.events) {
    return <div>Chargement des événements...</div>;
  }

  // Etape intermédiaire: Filtrage des événements par type & base de calcul de la pagination
  const filteredEvents = data.events.filter((event) => {
    if (!type) {
      return true;
    }
    // On retourne les événements qui ont le type correspondant à la valeur de l'état type
    return event.type === type;
  });

  // Calcul de la pagination avec les événements filtrés
  const pageCount = Math.ceil(filteredEvents.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const visibleEvents = filteredEvents.slice(
    startIndex,
    startIndex + PER_PAGE
  );

  // Création des options du select
    // Extraction des types d'événements uniques
  const allEventTypes = data.events.map((event) => event.type);
    // Création d'un Set pour éliminer les doublons
  const uniqueTypesSet = new Set(allEventTypes);
   // Conversion du Set en tableau
  const eventTypes = Array.from(uniqueTypesSet);

  // Stockage de l'événement sélectionné pour la modal
  const selectedEvent = data.events.find(event => event.id === modalEventId);

  /* 4. RENDU */
  return (
    <>

      {/* SELECT */}
      <div className="SelectContainer">
        <Select
          selection={eventTypes}
          onChange={handleTypeChange}
          value={type}
          placeholder="Filtrer par type"
          aria-label="Filtre par type d'événement"
        />
      </div>

      {/* LISTE DES ÉVÉNEMENTS FILTRÉS */}
      <div className="ListContainer" data-testid="list-container-testid">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            imageSrc={event.cover} 
            title={event.title}
            date={new Date(event.date)}
            label={event.type}
            onClick={() => handleEventClick(event.id)} // 
          />
        ))}
      </div>

    {/* MODAL */}
    {/* Si selectedEvent est différent de null, alors on affiche le modal */}
     {selectedEvent && (
        <Modal
          opened
          Content={<ModalEvent event={selectedEvent} />}
          onClose={handleCloseModal}
        >
          {() => null}
        </Modal>
      )}

      {/* PAGINATION */}
      {pageCount > 1 && (
        <div className="Pagination">
          {[...Array(pageCount)].map((_, index) => (
            <button
              type="button"
              key={`page-${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
              aria-label={`Page ${index + 1}`}
              aria-current={currentPage === index + 1 ? "page" : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default EventList;