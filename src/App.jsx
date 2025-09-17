import "./App.css";
import { getFilms } from "./services/getFilms";
import Card from "./components/card";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "./components/pagination";

function App() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["films", page],
        queryFn: () => getFilms(page),
        keepPreviousData: true,
    });

    const films = data?.results ?? [];
    const totalPages = data?.total_pages ?? 1;
    return (
        <>
            {isLoading ? (
                <p>Cargando películas...</p>
            ) : (
                <div>
                    <h1>Películas y Series Populares</h1>
                    <ul>
                        {films.map((film) => (
                            <Card film={film} key={film.id} />
                        ))}
                    </ul>
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </div>
            )}
        </>
    );
}

export default App;
