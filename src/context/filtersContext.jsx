import { createContext, useContext, useState } from "react";

const filtersContext = createContext();

export const FiltersProvider = ({ children }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    return (
        <filtersContext.Provider value={{ selectedGenres, setSelectedGenres }}>
            {children}
        </filtersContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilters = () => useContext(filtersContext);
