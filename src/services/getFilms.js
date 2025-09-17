export const getFilms = async (page) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer  ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    };
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`,
            options
        );
        if (!response.ok) {
            throw new Error("Failed to fetch films");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};
