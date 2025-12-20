import type { Character } from '../api/apiSlice';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
    character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
    return (
        <Link to={`/character/${character.id}`} className="block group h-full">
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-slate-700">
                {/* Image Section - White/Light background with pattern effect */}
                <div className="relative h-80 overflow-hidden bg-white flex items-center justify-center p-6">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl z-10"
                        loading="lazy"
                    />
                </div>

                {/* Content Section - Dark background */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-0.5 group-hover:text-yellow-400 transition-colors">
                            {character.name}
                        </h3>
                        <p className="text-yellow-500 font-semibold text-sm">
                            {character.race} - {character.gender}
                        </p>
                    </div>

                    <div className="space-y-3 mt-2">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Base KI:</p>
                            <p className="text-yellow-500 font-bold text-lg leading-tight">{character.ki}</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total KI:</p>
                            <p className="text-yellow-500 font-bold text-lg leading-tight">{character.maxKi}</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Affiliation:</p>
                            <p className="text-yellow-500 font-bold text-sm">{character.affiliation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
