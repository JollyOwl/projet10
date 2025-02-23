import { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Utilisation de `type` sans conflit
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des événements par type et pagination
  const filteredEvents = useMemo(() => {
    const events = data?.events || [];
    const filteredByType = type ? events.filter((event) => event.type === type) : events;
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return filteredByType.slice(startIndex, endIndex);
  }, [data?.events, type, currentPage]);

  // Renommage de 'evtType' pour éviter le conflit de noms
  const changeType = (newType) => {
    setCurrentPage(1); // Réinitialisation de la page
    setType(newType); // Mise à jour du type sélectionné
  };

  const pageNumber = Math.floor(
    (data?.events.filter(event => !type || event.type === type).length || 0) / PER_PAGE
  ) + 1;

  // Liste des types d'événements uniques
  const typeList = useMemo(() => {
    const types = data?.events.map((event) => event.type);
    // eslint-disable-next-line no-shadow
    return new Set(types.filter(type => type && typeof type === 'string' && type.trim() !== '')); // Filtrage des types invalides
  }, [data?.events]);

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              <a
                key={`page-${n + 1}`}  // Utilisation d'une clé unique pour chaque page
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
