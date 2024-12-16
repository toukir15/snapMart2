import Banner from "@/src/components/pageComponents/Home/Banner";
import Category from "@/src/components/pageComponents/Home/Category";
import FlashSale from "@/src/components/pageComponents/Home/FlashSale";
import JustForYou from "@/src/components/pageComponents/Home/JustForYou";

export default function Home() {
  return (
    <section className="container mx-auto">
      <Banner />
      <FlashSale />
      <Category />
      <JustForYou />
    </section>
  );
}
