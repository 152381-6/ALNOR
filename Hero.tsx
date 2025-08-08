import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gray-50 py-16 md:py-24">
      <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900">
              تسوق بسهولة من أفضل المتاجر في <span className="text-primary">اليمن</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              منصة تسوق إلكتروني تجمع أفضل المنتجات من المتاجر المحلية مع خدمة توصيل سريعة وموثوقة
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to="/categories">تسوق الآن</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/how-it-works">كيف يعمل دكان؟</Link>
            </Button>
          </div>
          <div className="flex gap-8 pt-2">
            <div>
              <p className="font-bold text-2xl md:text-3xl text-primary">+1000</p>
              <p className="text-sm text-muted-foreground">منتج</p>
            </div>
            <div>
              <p className="font-bold text-2xl md:text-3xl text-primary">+200</p>
              <p className="text-sm text-muted-foreground">متجر محلي</p>
            </div>
            <div>
              <p className="font-bold text-2xl md:text-3xl text-primary">+10</p>
              <p className="text-sm text-muted-foreground">مدن يمنية</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img 
            src="/assets/hero-image.jpg" 
            alt="تسوق في دكان" 
            className="rounded-lg shadow-xl max-w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400/e6e6e6/1a4d2e?text=دكان&font=Tajawal";
            }}
          />
        </div>
      </div>
      <div className="container mt-12">
        <div className="flex flex-wrap gap-8 justify-center">
          <img src="https://placehold.co/120x60/e6e6e6/777?text=شركة+توصيل" alt="شركة توصيل" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/120x60/e6e6e6/777?text=شركة+توصيل" alt="شركة توصيل" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/120x60/e6e6e6/777?text=شركة+توصيل" alt="شركة توصيل" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/120x60/e6e6e6/777?text=شركة+توصيل" alt="شركة توصيل" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="https://placehold.co/120x60/e6e6e6/777?text=شركة+توصيل" alt="شركة توصيل" className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
        </div>
      </div>
    </section>
  );
}