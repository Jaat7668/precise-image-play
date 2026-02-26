import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PromotionsBanner from "@/components/PromotionsBanner";
import MenuSection from "@/components/MenuSection";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PromotionsBanner />
      <MenuSection />
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default Index;
