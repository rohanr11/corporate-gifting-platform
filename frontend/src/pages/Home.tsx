import { Hero } from "../components/Hero";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { CategoryGrid } from "../components/CategoryGrid";
import { CorporateClients } from "../components/CorporateClients";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";

export function Home() {
  return (
    <main>
      {/* Single H1 for the page lives inside Hero */}
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      {/*<CorporateClients />*/}
      {/*<Testimonials />*/}
      <Newsletter />
    </main>
  );
}
