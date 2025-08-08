import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { VerificationBanner } from "./VerificationBanner";
import { useAuth } from "@/lib/auth";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {user && user.isVerified === false && <VerificationBanner />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}