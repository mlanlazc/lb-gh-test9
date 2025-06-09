import { Links, Meta, Scripts, ScrollRestoration, NavLink } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarContent } from '@/components/ui/sidebar';
import { Home, Building2 } from 'lucide-react';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <NavLink to="/" className="flex items-center gap-2 font-semibold">
                <Home className="h-6 w-6" />
                <span>Dashboard</span>
              </NavLink>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/organizations">
                      <Building2 />
                      <span>Organizations</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarSeparator />
          </Sidebar>
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
