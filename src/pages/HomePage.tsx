import { CharacterList } from '../features/characters/CharacterList';

export function HomePage() {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-lg mb-8">
                <h1 className="text-4xl font-bold mb-2">Welcome to the Dragon Ball Universe</h1>
                <p className="text-orange-100 text-lg">Explore characters, transformations, and more.</p>
            </div>

            <CharacterList />
        </div>
    );
}
