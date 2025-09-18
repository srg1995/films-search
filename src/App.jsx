import "./index.css";
import { getFilms } from "./services/getFilms";
import Card from "./components/card";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "./components/pagination";
import Filters from "./components/filters";
import { getGenre } from "./services/getGenre";
import { FiltersProvider } from "./context/filtersContext";

function App() {
    const [page, setPage] = useState(1);

    const { data: dataFilms, isLoading } = useQuery({
        queryKey: ["films", page],
        queryFn: () => getFilms(page),
        keepPreviousData: true,
    });
    const { data: dataGenres } = useQuery({
        queryKey: ["genre"],
        queryFn: getGenre,
    });

    const films = dataFilms?.results ?? [];
    const genres = dataGenres?.genres ?? [];
    const totalPages = dataFilms?.total_pages ?? 1;
    return (
        <>
            {isLoading ? (
                <h1 className="text-3xl font-bold ">Cargando películas...</h1>
            ) : (
                <FiltersProvider>
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold ">
                            Películas y Series Populares
                        </h1>
                        <Filters filters={genres} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                            {films.map((film) => (
                                <Card film={film} key={film.id} />
                            ))}
                        </div>
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                        />
                    </div>
                </FiltersProvider>
            )}
        </>
    );
}

export default App;
