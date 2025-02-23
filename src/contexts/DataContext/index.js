import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

// récupère /events.json
export const api = {
  loadData: async () => {
    try {
      const response = await fetch("/events.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json); 
      return json;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  },
};

// Fournit les data via le contexte 
export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // récupère les data et met à jour le state 
  const getData = useCallback(async () => {
    try {
      const newData = await api.loadData();
      console.log("fetched data:", newData);
      setData(newData);
    } catch (err) {
      setError(err);
    }
  }, []);

  // appelle getData au montage
  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]);

  // Ajout de logs pour le débogage
  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    } else if (data) {
      console.log("Data fetched successfully in DataContext.js:", data);
    } else {
      console.log("Data is still loading in DataContext.js");
    }
  }, [data, error]);

  // fournit les data/erreur  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;