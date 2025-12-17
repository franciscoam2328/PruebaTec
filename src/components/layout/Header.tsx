import { Link } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img
                        src="https://web.dragonball-api.com/images-static/dragon-ball-z-logo.png"
                        alt="Dragon Ball Logo"
                        className="h-10 w-auto object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/2/22/Dragon_Ball_Super.png';
                        }}
                    />
                    <span className="text-xl font-bold text-gray-800 hidden sm:block">DB Universe</span>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Characters</a>
                    <a href="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Planets</a>
                    <a href="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">About</a>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-1.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm w-48 transition-all focus:w-64"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
