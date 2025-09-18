import { useFilters } from "@/context/filtersContext";
import LazyImage from "./LazyImage";

function Card({ film }) {
    const { selectedGenres } = useFilters();
    const isFiltered =
        selectedGenres.length === 0 ||
        selectedGenres.some((g) => film.genre_ids.includes(g.id));
    return (
        <>
            {isFiltered && (
                <div className=" bg-white shadow-lg rounded-2xl overflow-hidden m-4 hover:scale-105 transition-transform duration-300">
                    <LazyImage
                        src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                        alt={film.title || film.name}
                        className="w-full h-96"
                    />
                    <div className="p-4 flex flex-col justify-between h-48">
                        <h2 className="text-lg font-bold mb-2">
                            {film.title || film.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                            {film.overview || "Sin descripción disponible."}
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-yellow-500 font-semibold">
                                ⭐ {film.vote_average}
                            </span>
                            <span className="text-gray-400 text-sm">
                                {film.media_type === "movie"
                                    ? film.release_date
                                    : film.first_air_date}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Card;
