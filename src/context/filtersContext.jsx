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

export const useFilters = () => useContext(filtersContext);
