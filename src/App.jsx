import "./App.css";
import { getFilms } from "./services/getFilms";
import Card from "./components/card";

import { useQuery } from "@tanstack/react-query";

function App() {
    const { data, isLoading } = useQuery({
        queryKey: ["films"], // la “key” de la query
        queryFn: getFilms,
    });
    const films = data?.results ?? [];
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
                </div>
            )}
        </>
    );
}

export default App;
