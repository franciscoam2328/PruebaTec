import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetCharacterByIdQuery, useDeleteCharacterMutation } from '../features/api/apiSlice';
import { Loader2, ArrowLeft, Zap, Shield, Trash } from 'lucide-react';
import { useToast } from '../components/ui/ToastContext';

export function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { data: character, isLoading, error } = useGetCharacterByIdQuery(id!);
    const [deleteCharacter, { isLoading: isDeleting }] = useDeleteCharacterMutation();

    const handleDelete = async () => {
        if (!character) return;
        if (confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
            try {
                await deleteCharacter(character.id).unwrap();
                addToast('Character deleted successfully', 'success');
                navigate('/');
            } catch (err) {
                console.error('Failed to delete character:', err);
                addToast('Failed to delete character', 'error');
            }
        }
    };

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
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-yellow-500 mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Characters
            </Link>

            <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-white p-8 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <img
                            src={character.image}
                            alt={character.name}
                            className="relative z-10 max-h-[500px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{character.name}</h1>
                                <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-sm font-bold uppercase tracking-wider">
                                    {character.race}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="block text-sm text-gray-400 font-bold uppercase">Gender</span>
                                <span className="font-medium text-white">{character.gender}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <Link
                                to={`/character/${character.id}/edit`}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-lg hover:shadow-yellow-500/20"
                            >
                                Edit Character
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Trash className="w-5 h-5" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                            {character.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <Zap className="w-4 h-4" />
                                    <span>Base Ki</span>
                                </div>
                                <span className="text-xl font-bold text-yellow-500">{character.ki}</span>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <Shield className="w-4 h-4" />
                                    <span>Total Ki</span>
                                </div>
                                <span className="text-xl font-bold text-yellow-500">{character.maxKi}</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-700 pt-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Affiliation</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl border border-slate-600">
                                    🌍
                                </div>
                                <span className="font-bold text-white text-lg">{character.affiliation}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
