import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFilmById } from "@/services/getFilmById";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Detail() {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["film", id],
        queryFn: () => getFilmById(id),
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-gray-700 animate-pulse">
                    Cargando...
                </p>
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12">
            {/* Botón de volver */}
            <Link
                to="/"
                className="flex items-center text-indigo-600 font-semibold mb-6 hover:text-indigo-800"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Volver a la lista
            </Link>

            <div className="flex flex-col md:flex-row gap-8  bg-blue-50 shadow-xl rounded-2xl overflow-hidden">
                {/* Imagen */}
                <div className="md:w-1/3 flex justify-center items-start ">
                    <img
                        src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
                        alt={data.title || data.name}
                        className=" shadow-lg transition-transform transform hover:scale-105"
                    />
                </div>

                {/* Información */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <h1 className="text-4xl font-bold mb-4">
                        {data.title || data.name}
                    </h1>
                    <p className="text-gray-700 text-lg mb-4 line-clamp-8">
                        {data.overview || "No hay descripción disponible."}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <span className="px-3 py-1 bg-indigo-100 border-2 border-indigo-200 text-indigo-800 font-medium rounded-full">
                            ⭐ {data.vote_average}
                        </span>

                        {data.genres?.map((g) => (
                            <span
                                key={g.id}
                                className="px-3 py-1 bg-green-100 border-2 border-green-200  text-green-800 font-medium rounded-full"
                            >
                                {g.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
