import { MainLayout } from "@/components/layout/MainLayout";
import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StoresSection } from "@/components/home/StoresSection";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <StoresSection />
      <HowItWorks />
    </MainLayout>
  );
}