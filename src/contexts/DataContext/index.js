import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


/* CREATION DU CONTEXT */
const DataContext = createContext({});

/* RÉCUPÉRATION DES DATA DANS L'OBJET API */
export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  },
};

/* HOOK PERSONNALISÉ POUR UTILISER LE CONTEXTE */
export const useData = () => useContext(DataContext);

/* PROVIDER DU CONTEXTE */
export const DataProvider = ({ children }) => {
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState(null);

  // Gestion d'état 
  const getData = useCallback(async () => {
    try {
      const newData = await api.loadData();
      setData(newData);
    } catch (err) {
      setFetchError(err); 
    }
  }, []);

  // Récupération des data au montage de <DataProvider>
  useEffect(() => {
    getData();
  }, [getData]);

  // utilisation du useMemo pour éviter de re-render
  const value = useMemo(() => ({
    data,
    error: fetchError
  }), [data, fetchError]);


  /* RENDU */
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContext;