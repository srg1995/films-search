function Pagination({ page, totalPages, setPage }) {
    return (
        <>
            <div className="flex justify-center items-center space-x-4 my-4">
                <button
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Anterior
                </button>

                <span>
                    Página {page} de {totalPages}
                </span>

                <button
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                    onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </>
    );
}

export default Pagination;
