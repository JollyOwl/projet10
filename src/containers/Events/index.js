import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Gestion des erreurs de chargement
  if (error) {
    return <div>Une erreur est survenue lors du chargement des événements.</div>;
  }

  // Gestion du chargement initial
  if (!data || !data.events) {
    return <div>Chargement des événements...</div>;
  }

  // Filtrage des événements
  const filteredEvents = data.events.filter(
    (event) => !type || event.type === type
  );

  // Calcul de la pagination
  const pageCount = Math.ceil(filteredEvents.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const visibleEvents = filteredEvents.slice(
    startIndex,
    startIndex + PER_PAGE
  );

  // Liste des types uniques d'événements
  const eventTypes = Array.from(
    new Set(data.events.map((event) => event.type))
  );

  // Trouver l'événement sélectionné
  const selectedEvent = data.events.find(event => event.id === selectedEventId);

  // Gestionnaires d'événements
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
  };

  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
  };

  const handleCloseModal = () => {
    setSelectedEventId(null);
  };

  return (
    <>
      {selectedEvent && (
        <Modal
          opened
          Content={<ModalEvent event={selectedEvent} />}
          onClose={handleCloseModal}
        >
          {() => null}
        </Modal>
      )}
      <div className="SelectContainer">
        <Select
          selection={eventTypes}
          onChange={handleTypeChange}
          value={type}
          placeholder="Filtrer par type"
          aria-label="Filtre par type d'événement"
        />
      </div>

      <div className="ListContainer" data-testid="list-container-testid">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            imageSrc={event.cover} 
            title={event.title}
            date={new Date(event.date)}
            label={event.type}
            onClick={() => handleEventClick(event.id)}
          />
        ))}
      </div>

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