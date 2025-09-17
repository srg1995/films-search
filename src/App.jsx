import { useEffect, useState } from "react";
import "./App.css";
import { getFilms } from "./services/getFilms";

function App() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const res = await getFilms();
                setFilms(res.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching films:", error);
            }
        };
        fetchFilms();
    }, []);

    return (
        <>
            {loading ? (
                <p>Cargando películas...</p>
            ) : (
                <div>
                    <h1>Películas y Series Populares</h1>
                    <ul>
                        {films.map((film) => (
                            <li key={film.id}>
                                <h2>{film.title || film.name}</h2>
                                <p>
                                    {film.overview ||
                                        "Sin descripción disponible."}
                                </p>
                                {film.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                                        alt={film.title || film.name}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default App;
