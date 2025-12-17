import { useParams, Link } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../features/api/apiSlice';
import { Loader2, ArrowLeft, Zap, Shield } from 'lucide-react';

export function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: character, isLoading, error } = useGetCharacterByIdQuery(id!);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (error || !character) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Character not found</h2>
                <Link to="/" className="text-orange-500 hover:underline">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Characters
            </Link>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-blue-100/50" />
                        <img
                            src={character.image}
                            alt={character.name}
                            className="relative z-10 max-h-[500px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{character.name}</h1>
                                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                                    {character.race}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="block text-sm text-gray-500">Gender</span>
                                <span className="font-medium text-gray-800">{character.gender}</span>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {character.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                <div className="flex items-center gap-2 mb-1 text-orange-600">
                                    <Zap className="w-5 h-5" />
                                    <span className="font-bold">Ki</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">{character.ki}</span>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-2 mb-1 text-blue-600">
                                    <Shield className="w-5 h-5" />
                                    <span className="font-bold">Max Ki</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">{character.maxKi}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Affiliation</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                                    🌍
                                </div>
                                <span className="font-medium text-gray-700">{character.affiliation}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
