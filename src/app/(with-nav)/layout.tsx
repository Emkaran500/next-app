import { Footer } from "@/components/layout/footer/footer";
import { NavBar } from "@/components/layout/nav-bar/nav-bar";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}