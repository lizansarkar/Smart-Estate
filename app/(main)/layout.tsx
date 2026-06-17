import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
