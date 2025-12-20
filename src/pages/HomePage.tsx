import { CharacterList } from '../features/characters/CharacterList';

export function HomePage() {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl">
                <div className="absolute inset-0 bg-slate-900/50 z-10"></div>
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://web.dragonball-api.com/images-static/dragon-ball-z-logo.png')] bg-center bg-no-repeat bg-contain"></div>

                <div className="relative z-20 px-8 py-16 md:py-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 drop-shadow-sm tracking-tight">
                        Dragon Ball Universe
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Explore the vast collection of fighters, deities, and villains from the legendary saga.
                        Power levels, transformations, and affiliations at your fingertips.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <a href="/create" className="px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1">
                            Add Character
                        </a>
                        <a href="https://web.dragonball-api.com/" target="_blank" rel="noreferrer" className="px-8 py-3 bg-slate-700 text-white font-bold rounded-full hover:bg-slate-600 transition-all border border-slate-600">
                            API Docs
                        </a>
                    </div>
                </div>
            </div>

            <CharacterList />
        </div>
    );
}
