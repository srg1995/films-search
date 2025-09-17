function Pagination({ page, totalPages, setPage }) {
    return (
        <>
            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Anterior
                </button>

                <span>
                    Página {page} de {totalPages}
                </span>

                <button
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
