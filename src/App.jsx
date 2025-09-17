import "./index.css";
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
                <h1 className="text-3xl font-bold ">Cargando películas...</h1>
            ) : (
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold ">
                        Películas y Series Populares
                    </h1>
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
            )}
        </>
    );
}

export default App;
