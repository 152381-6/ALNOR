import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  slug: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating: number;
};

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const products: Product[] = [
    {
      id: "1",
      name: "هاتف ذكي - سامسونج جالاكسي",
      description: "هاتف ذكي بمواصفات ممتازة وسعر معقول",
      price: 85000,
      originalPrice: 95000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=هاتف+ذكي",
      category: "electronics",
      slug: "samsung-galaxy",
      isOnSale: true,
      rating: 4.5
    },
    {
      id: "2",
      name: "حاسوب محمول - لينوفو",
      description: "حاسوب محمول خفيف الوزن مع أداء عالي",
      price: 220000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=حاسوب+محمول",
      category: "electronics",
      slug: "lenovo-laptop",
      isNew: true,
      rating: 4.2
    },
    {
      id: "3",
      name: "ساعة ذكية",
      description: "ساعة ذكية متعددة الاستخدامات",
      price: 35000,
      originalPrice: 40000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=ساعة+ذكية",
      category: "electronics",
      slug: "smart-watch",
      isOnSale: true,
      rating: 4.0
    },
    {
      id: "4",
      name: "سماعات لاسلكية",
      description: "سماعات بلوتوث عالية الجودة",
      price: 28000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=سماعات",
      category: "electronics",
      slug: "wireless-headphones",
      isNew: true,
      rating: 4.8
    },
    {
      id: "5",
      name: "قميص رجالي أنيق",
      description: "قميص رجالي بتصميم عصري",
      price: 12000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=قميص",
      category: "fashion",
      slug: "mens-shirt",
      rating: 4.1
    },
    {
      id: "6",
      name: "حقيبة يد نسائية",
      description: "حقيبة يد عصرية من الجلد الطبيعي",
      price: 25000,
      originalPrice: 30000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=حقيبة",
      category: "fashion",
      slug: "womens-bag",
      isOnSale: true,
      rating: 4.6
    },
    {
      id: "7",
      name: "خلاط كهربائي",
      description: "خلاط كهربائي متعدد السرعات",
      price: 18000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=خلاط",
      category: "home-kitchen",
      slug: "blender",
      rating: 4.3
    },
    {
      id: "8",
      name: "طقم أواني طهي",
      description: "طقم أواني طهي متكامل من الستانلس ستيل",
      price: 45000,
      originalPrice: 55000,
      image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=أواني+طهي",
      category: "home-kitchen",
      slug: "cookware-set",
      isOnSale: true,
      rating: 4.7
    }
  ];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">منتجات مميزة</h2>
          <Link to="/products" className="text-primary hover:underline font-medium">
            عرض الكل
          </Link>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-8">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="new">وصل حديثاً</TabsTrigger>
            <TabsTrigger value="sale">تخفيضات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isFavorite={favorites.includes(product.id)} 
                  onFavoriteToggle={() => toggleFavorite(product.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.filter(p => p.isNew).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isFavorite={favorites.includes(product.id)} 
                  onFavoriteToggle={() => toggleFavorite(product.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sale">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.filter(p => p.isOnSale).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isFavorite={favorites.includes(product.id)} 
                  onFavoriteToggle={() => toggleFavorite(product.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="rounded-lg overflow-hidden relative h-60">
            <img 
              src="https://placehold.co/800x400/e6e6e6/1a4d2e?text=عروض+خاصة" 
              alt="عروض خاصة" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 p-8 flex flex-col justify-center">
              <h3 className="text-white text-2xl font-bold mb-2">عروض نهاية الأسبوع</h3>
              <p className="text-white/90 mb-4">خصم 25% على جميع المنتجات الإلكترونية</p>
              <Button size="sm" variant="default" className="w-max">
                تسوق الآن
              </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden relative h-60">
            <img 
              src="https://placehold.co/800x400/e6e6e6/1a4d2e?text=مستلزمات+المنزل" 
              alt="مستلزمات المنزل" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 p-8 flex flex-col justify-center">
              <h3 className="text-white text-2xl font-bold mb-2">مستلزمات المنزل</h3>
              <p className="text-white/90 mb-4">اكتشف تشكيلتنا الجديدة من مستلزمات المنزل العصرية</p>
              <Button size="sm" variant="default" className="w-max">
                تسوق الآن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

function ProductCard({ product, isFavorite, onFavoriteToggle }: ProductCardProps) {
  return (
    <Card className="product-card overflow-hidden">
      <div className="relative">
        <Link to={`/products/${product.slug}`}>
          <div className="overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 left-2 bg-white/80 rounded-full hover:bg-white/95"
          onClick={onFavoriteToggle}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          <span className="sr-only">إضافة للمفضلة</span>
        </Button>
        {product.isNew && (
          <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-500">جديد</Badge>
        )}
        {product.isOnSale && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-500">تخفيض</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium text-base line-clamp-1 hover:text-primary">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10 mt-1">{product.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">{product.price.toLocaleString()} ر.ي</p>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()} ر.ي
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center text-amber-500">
            <span className="text-xs ml-1">{product.rating}</span>
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button size="sm" className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" /> إضافة للسلة
        </Button>
      </CardFooter>
    </Card>
  );
}