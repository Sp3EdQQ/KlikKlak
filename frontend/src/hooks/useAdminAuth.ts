import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface AdminUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
}

export function useAdminAuth() {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('adminToken');
            const userStr = localStorage.getItem('adminUser');

            if (!token || !userStr) {
                navigate('/login');
                setLoading(false);
                return;
            }

            try {
                const userData = JSON.parse(userStr) as AdminUser;

                if (userData.role !== 'admin') {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                    navigate('/login');
                    setLoading(false);
                    return;
                }

                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                navigate('/login');
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    return { user, loading, logout };
}
