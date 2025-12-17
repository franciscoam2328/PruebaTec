import { useState } from 'react';
import { useGetCharactersQuery } from '../api/apiSlice';
import { CharacterCard } from './CharacterCard';
import { Search, Loader2, AlertCircle } from 'lucide-react';

export function CharacterList() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isFetching } = useGetCharactersQuery(page);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter characters client-side since API search might be different or limited
    // Actually, the API supports filtering, but for Level 1 "Agregar un campo de búsqueda o filtrado simple", client side is fine for the current page.
    // However, strictly speaking, we should probably filter across all, but with pagination it's tricky.
    // Let's implement a simple client-side filter on the current page for now, or just rely on the API if we can.
    // The API doesn't seem to have a search endpoint in the slice yet.
    // I'll stick to client-side filtering of the *fetched* data for Level 1 simplicity, or add search to API later.

    const filteredCharacters = data?.items.filter(char =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-500">
                <AlertCircle className="w-10 h-10 mb-2" />
                <p>Error loading characters. Please try again.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Characters</h2>

                <div className="relative w-full sm:w-72">
                    <input
                        type="text"
                        placeholder="Filter characters..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {filteredCharacters && filteredCharacters.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCharacters.map((character) => (
                        <CharacterCard key={character.id} character={character} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    No characters found matching "{searchTerm}"
                </div>
            )}

            {/* Simple Pagination for Level 1/2 */}
            <div className="mt-8 flex justify-center gap-4">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1 || isFetching}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <span className="flex items-center px-4 font-medium text-gray-700">
                    Page {page} of {data?.meta.totalPages || 1}
                </span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page === (data?.meta.totalPages || 1) || isFetching}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
