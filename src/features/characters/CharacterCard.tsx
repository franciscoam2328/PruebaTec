import type { Character } from '../api/apiSlice';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
    character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
    return (
        <Link to={`/character/${character.id}`} className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        Ki: {character.ki}
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
                        {character.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{character.race} - {character.gender}</p>

                    <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                            {character.affiliation}
                        </span>
                        <span className="text-orange-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                            View Details →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
