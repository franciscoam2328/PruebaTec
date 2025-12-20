import type { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-900 font-sans text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-slate-950 text-white py-6 mt-auto border-t border-slate-800">
                <div className="container mx-auto px-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Dragon Ball Fan App. Data provided by Dragon Ball API.
                </div>
            </footer>
        </div>
    );
}
