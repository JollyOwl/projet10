import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
      console.log("Data fetched:", json);
      return json;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  },
};

// Fournit les data via le context
export const DataProvider = ({ children }) => {
  const [fetchError, setFetchError] = useState(null); // Renommé pour éviter le shadowing
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      const newData = await api.loadData();
      console.log("fetched data:", newData);
      setData(newData);
    } catch (err) {
      setFetchError(err); 
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching data:", fetchError);
    } else if (data) {
      console.log("Data fetched successfully in DataContext.js:", data);
    } else {
      console.log("Data is still loading in DataContext.js");
    }
  }, [data, fetchError]);

  const value = useMemo(() => ({
    data,
    error: fetchError, 
    last: Array.isArray(data?.events) && data.events.length > 0 ? data.events[data.events.length - 1] : null,
  }), [data, fetchError]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};


DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useData = () => useContext(DataContext);

export default DataContext;