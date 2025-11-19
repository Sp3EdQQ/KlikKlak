import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query-client"

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
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
