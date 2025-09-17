function Card({ film }) {
    return (
        <>
            <li key={film.id}>
                <h2>{film.title || film.name}</h2>
                <p>{film.overview || "Sin descripción disponible."}</p>
                {film.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                        alt={film.title || film.name}
                    />
                )}
            </li>
        </>
    );
}

export default Card;
