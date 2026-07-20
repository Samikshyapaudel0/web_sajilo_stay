import HostSidebar from "./_components/HostSidebar";
import HostHeader from "./_components/HostHeader";
import Footer from "./_components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-canvas text-body">
      <HostSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <HostHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
 
