import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useFilters } from "@/context/filtersContext";
import { useDebounce } from "@/hooks/useDebounce";
export default function FiltersDropdown({ filters, onChange }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { selectedGenres, setSelectedGenres } = useFilters();
    const debouncedQuery = useDebounce(query, 400);
    const filtered = debouncedQuery
        ? filters.filter((f) =>
              f.name.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
        : filters;

    function toggleFilter(filter) {
        const exists = selectedGenres.some((s) => s.id === filter.id);
        const newSelected = exists
            ? selectedGenres.filter((s) => s.id !== filter.id)
            : [...selectedGenres, filter];
        setOpen(false);
        setSelectedGenres(newSelected);
        onChange?.(newSelected);
    }

    return (
        <div className="w-full flex flex-col px-8">
            <div className="w-64 ">
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-2 border rounded-xl bg-white shadow hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    <span className="truncate">Selecciona géneros...</span>
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform ${
                            open ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {open && (
                    <div className="absolute z-20 mt-2  bg-white border rounded-xl shadow-lg">
                        {/* Barra de búsqueda */}
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        {/* Opciones */}
                        <ul className="max-h-60 overflow-y-auto">
                            {filtered.length === 0 ? (
                                <li className="px-3 py-2 text-gray-500">
                                    Sin resultados
                                </li>
                            ) : (
                                filtered.map((filter) => {
                                    const isSelected = selectedGenres.some(
                                        (s) => s.id === filter.id
                                    );
                                    return (
                                        <li
                                            key={filter.id}
                                            onClick={() => toggleFilter(filter)}
                                            className={`cursor-pointer px-3 py-2 flex justify-between items-center hover:bg-gray-50 ${
                                                isSelected
                                                    ? "bg-indigo-50 font-medium"
                                                    : ""
                                            }`}
                                        >
                                            {filter.name}
                                            {isSelected && (
                                                <svg
                                                    className="w-4 h-4 text-indigo-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </li>
                                    );
                                })
                            )}
                        </ul>

                        {/* Pie con acción */}
                        <div className="p-2 border-t bg-gray-50 flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedGenres([]);
                                    onChange?.([]);
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                Limpiar selección
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-2 flex">
                {selectedGenres.map((select) => {
                    return (
                        <button
                            className={
                                " flex justify-between items-center px-2 gap-1 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 m-1 hover:bg-red-200 hover:text-red-800 cursor-pointer "
                            }
                            onClick={() => toggleFilter(select)}
                        >
                            {select.name} <XCircleIcon className="w-4 h-4" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
