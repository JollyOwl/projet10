import { useData } from "../../contexts/DataContext";
import EventCard from "../EventCard";
import Logo from "../Logo";
import Icon from "../Icon";
import "./style.scss";

const Footer = () => {
  const { data } = useData();

  // Récupération du dernier événement par date
  let lastEvent = null;
  
  // Vérification de la présence des données et du tableau d'événements
  if (data?.events?.length) {
    // Tri des événements par date décroissante (du plus récent au plus ancien)
    const sortedEvents = data.events.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    // Récupération du premier événement (le plus récent)
    [lastEvent] = sortedEvents;
  }

  return (
    <footer className="row">
      <div className="col presta">
        <h3>Notre derniére prestation</h3>
        {lastEvent && lastEvent.cover && lastEvent.title && lastEvent.date ? (
          <EventCard
            imageSrc={lastEvent.cover}
            title={lastEvent.title}
            date={new Date(lastEvent.date)}
            small
            label="boom"
          />
        ) : (
          <p>Aucune prestation récente</p>
        )}
      </div>
      <div className="col contact">
        <h3>Contactez-nous</h3>
        <address>45 avenue de la République, 75000 Paris</address>
        <div>01 23 45 67 89</div>
        <div>contact@724events.com</div>
        <div>
          <a href="#twitch">
            <Icon name="twitch" />
          </a>
          <a href="#facebook">
            <Icon name="facebook" />
          </a>
          <a href="#twitter">
            <Icon name="twitter" />
          </a>
          <a href="#youtube">
            <Icon name="youtube" />
          </a>
        </div>
      </div>
      <div className="col description">
        <Logo size="large" />
        <p>
          Une agence événementielle propose des prestations de service
          spécialisées dans la conception et l&apos;organisation de divers événements
          tels que des événements festifs, des manifestations sportives et
          culturelles, des événements professionnels
        </p>
      </div>
    </footer>
  );
};

export default Footer;