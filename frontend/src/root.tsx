import { useEffect, useState } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import AdminRoot from './admin-root';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/src/assets/svgs/Logo.svg" />
        <title>KlikKlak</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Sprawdź czy jesteśmy na subdomenie admin
    const hostname = window.location.hostname;
    const isAdminSubdomain = hostname.startsWith('admin.');
    setIsAdmin(isAdminSubdomain);
  }, []);

  // Jeśli jesteśmy na subdomenie admin, renderuj panel admina
  if (isAdmin) {
    return <AdminRoot />;
  }

  // W przeciwnym razie renderuj normalny sklep
  return <Outlet />;
}
