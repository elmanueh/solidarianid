import { Header } from '@/components/app-header/header';
import { SidebarLateral } from '@/components/sidebar';
import { SidebarMobile } from '@/components/sidebar-mobile';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SidebarLateral />

        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1 p-5 md:ps-10">{children}</main>
        </SidebarInset>

        <SidebarMobile />
      </div>
    </SidebarProvider>
  );
}
