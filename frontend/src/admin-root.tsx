import { useEffect, useState } from 'react';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';

export default function AdminRoot() {
    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
        setCurrentPath(window.location.pathname);

        // Nasłuchuj zmian w URL
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Render odpowiedniego komponentu na podstawie ścieżki
    const renderPage = () => {
        switch (currentPath) {
            case '/':
                return <Dashboard />;
            case '/products':
                return <Products />;
            case '/orders':
                return <Orders />;
            case '/users':
                return <Users />;
            case '/settings':
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return renderPage();
}
