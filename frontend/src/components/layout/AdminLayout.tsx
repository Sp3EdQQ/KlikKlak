import { useState } from 'react';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Home,
} from 'lucide-react';
import { Logo } from '@/assets/svgs';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Produkty', href: '/products', icon: Package },
        { name: 'Zamówienia', href: '/orders', icon: ShoppingCart },
        { name: 'Użytkownicy', href: '/users', icon: Users },
        { name: 'Ustawienia', href: '/settings', icon: Settings },
    ];

    const handleNavigation = (href: string) => {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
        setIsSidebarOpen(false);
    };

    const handleStoreRedirect = () => {
        // Przekieruj do głównej domeny (usuń subdomenę admin)
        const currentHost = window.location.hostname;
        const mainHost = currentHost.replace('admin.', '');
        window.location.href = `${window.location.protocol}//${mainHost}${window.location.port ? ':' + window.location.port : ''}`;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
                        <button onClick={() => handleNavigation('/')} className="flex items-center gap-2">
                            <Logo className="h-8 w-8 text-white" />
                            <span className="text-xl font-bold text-white">KlikKlak Admin</span>
                        </button>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item.href)}
                                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.name}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Bottom section */}
                    <div className="border-t border-gray-800 p-4 space-y-2">
                        <button
                            onClick={handleStoreRedirect}
                            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                        >
                            <Home className="h-5 w-5" />
                            <span className="font-medium">Wróć do sklepu</span>
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Wyloguj się</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between h-16 px-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden text-gray-600 hover:text-gray-900"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="flex items-center gap-4 ml-auto">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                    A
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-sm font-medium text-gray-900">Admin User</div>
                                    <div className="text-xs text-gray-500">admin@klikklak.pl</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
