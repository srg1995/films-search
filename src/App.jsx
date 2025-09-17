import { useEffect, useState } from "react";
import "./App.css";
import { getFilms } from "./services/getFilms";
import Card from "./components/card";

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
                            <Card film={film} key={film.id} />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default App;
