import "@/src/styles/globals.css";
// import "@smastrom/react-rating/style.css";
import Footer from "@/src/components/Footer";
import { Navbar } from "@/src/components/shared/navbar";
import { useGetCartCount } from "@/src/hooks/cartItem.hook";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { data } = useGetCartCount()
  // console.log(data)
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}
