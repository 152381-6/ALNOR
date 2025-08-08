import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2, Truck, ShieldCheck, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  storeName: string;
  storeSlug: string;
  features: string[];
  specs: Record<string, string>;
  slug: string;
};

// Mock data for product
const productData: Record<string, Product> = {
  "samsung-galaxy": {
    id: "1",
    name: "هاتف ذكي - سامسونج جالاكسي A54",
    description: "هاتف ذكي بمواصفات ممتازة وسعر معقول، يأتي مع كاميرا عالية الدقة وبطارية تدوم طويلاً.",
    price: 85000,
    originalPrice: 95000,
    images: [
      { id: "1", url: "https://placehold.co/800x800/e6e6e6/1a4d2e?text=هاتف+سامسونج", alt: "هاتف سامسونج جالاكسي - الصورة الرئيسية" },
      { id: "2", url: "https://placehold.co/800x800/e6e6e6/1a4d2e?text=هاتف+سامسونج+خلفي", alt: "هاتف سامسونج جالاكسي - الجهة الخلفية" },
      { id: "3", url: "https://placehold.co/800x800/e6e6e6/1a4d2e?text=هاتف+سامسونج+جانبي", alt: "هاتف سامسونج جالاكسي - المنظر الجانبي" },
      { id: "4", url: "https://placehold.co/800x800/e6e6e6/1a4d2e?text=علبة+الهاتف", alt: "هاتف سامسونج جالاكسي - العلبة والملحقات" }
    ],
    category: "إلكترونيات",
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    storeName: "إلكترونيات المستقبل",
    storeSlug: "future-electronics",
    features: [
      "شاشة Super AMOLED مقاس 6.4 بوصة",
      "معالج Exynos 1380 ثماني النواة",
      "كاميرا خلفية ثلاثية بدقة 50 ميجابكسل",
      "بطارية 5000 مللي أمبير مع دعم الشحن السريع",
      "ذاكرة داخلية 128 جيجابايت قابلة للتوسيع"
    ],
    specs: {
      "الشاشة": "Super AMOLED 6.4 بوصة، دقة FHD+",
      "المعالج": "Exynos 1380 ثماني النواة",
      "الذاكرة": "6GB RAM, 128GB ROM",
      "الكاميرا الخلفية": "50MP + 12MP + 5MP",
      "الكاميرا الأمامية": "32MP",
      "البطارية": "5000mAh",
      "نظام التشغيل": "Android 13",
      "الأبعاد": "158.2 × 76.7 × 8.2 مم",
      "الوزن": "202 جرام",
      "المميزات الإضافية": "مقاوم للماء IP67، مستشعر بصمة الإصبع مدمج بالشاشة"
    },
    slug: "samsung-galaxy"
  },
  "lenovo-laptop": {
    id: "2",
    name: "حاسوب محمول - لينوفو IdeaPad 5",
    description: "حاسوب محمول خفيف الوزن مع أداء عالي، مثالي للعمل والترفيه مع عمر بطارية طويل.",
    price: 220000,
    images: [
      { id: "1", url: "https://placehold.co/800x800/e6e6e6/1a4d2e?text=لابتوب+لينوفو", alt: "لابتوب لينوفو IdeaPad 5 - الصورة الرئيسية" },
      { id: "2", url: "https://placehold.co/800x800/e6e6e6/1a4d2e?text=لابتوب+مفتوح", alt: "لابتوب لينوفو IdeaPad 5 - منظر مفتوح" },
      { id: "3", url: "https://placehold.co/800x800/e6e6e6/1a4d2e?text=لابتوب+جانبي", alt: "لابتوب لينوفو IdeaPad 5 - المنظر الجانبي" }
    ],
    category: "إلكترونيات",
    inStock: true,
    rating: 4.2,
    reviewCount: 76,
    storeName: "إلكترونيات المستقبل",
    storeSlug: "future-electronics",
    features: [
      "معالج Intel Core i5 الجيل 11",
      "ذاكرة 8 جيجابايت RAM",
      "تخزين SSD بسعة 512 جيجابايت",
      "شاشة 15.6 بوصة بدقة Full HD",
      "بطارية تدوم حتى 8 ساعات"
    ],
    specs: {
      "المعالج": "Intel Core i5-1135G7",
      "الذاكرة": "8GB DDR4",
      "التخزين": "512GB SSD",
      "الشاشة": "15.6 بوصة IPS FHD",
      "كرت الشاشة": "Intel Iris Xe Graphics",
      "نظام التشغيل": "Windows 11",
      "الوزن": "1.7 كجم",
      "المنافذ": "USB-C, HDMI, USB 3.2, قارئ بطاقات SD"
    },
    slug: "lenovo-laptop"
  }
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get product data based on slug
  const product = slug ? productData[slug] : null;

  if (!product) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">لم يتم العثور على المنتج</h1>
          <p className="mb-6">عذراً، لا يمكن العثور على المنتج الذي تبحث عنه.</p>
          <Button asChild>
            <Link to="/products">العودة إلى المنتجات</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Set the main image to the first image if not set
  if (!mainImage && product.images.length > 0) {
    setMainImage(product.images[0].url);
  }

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          {" / "}
          <Link to={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
          {" / "}
          <span>{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden bg-white aspect-square">
              <img 
                src={mainImage || product.images[0].url} 
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image) => (
                <div 
                  key={image.id}
                  className={`border rounded cursor-pointer aspect-square overflow-hidden ${
                    mainImage === image.url ? "border-primary ring-2 ring-primary/20" : "border-gray-200 hover:border-primary"
                  }`}
                  onClick={() => setMainImage(image.url)}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="w-full h-full object-cover p-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button variant="ghost" size="icon" onClick={toggleFavorite}>
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                    <span className="sr-only">إضافة للمفضلة</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">مشاركة</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-amber-500">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                  <span className="text-sm text-gray-600 mr-1">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} تقييم)</span>
              </div>
              
              <div className="flex items-center mt-2">
                <Link to={`/stores/${product.storeSlug}`} className="text-sm text-primary hover:underline">
                  {product.storeName}
                </Link>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">{product.price.toLocaleString()} ر.ي</p>
              {product.originalPrice && (
                <p className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()} ر.ي
                </p>
              )}
              {product.originalPrice && (
                <Badge className="bg-red-500 hover:bg-red-500">
                  خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 border-t pt-4">
                <p className="font-medium">الكمية:</p>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">تقليل الكمية</span>
                  </Button>
                  <div className="h-8 px-3 flex items-center justify-center border-y">
                    {quantity}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">زيادة الكمية</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'متوفر' : 'غير متوفر'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="flex-1 gap-2">
                  <ShoppingCart className="h-4 w-4" /> إضافة إلى السلة
                </Button>
                <Button size="lg" variant="secondary" className="flex-1">
                  شراء الآن
                </Button>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span className="text-sm">توصيل مجاني للطلبات أكثر من 25,000 ر.ي</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gray-500" />
                <span className="text-sm">ضمان جودة المنتج</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="features">المميزات والمواصفات</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            <TabsTrigger value="shipping">الشحن والتوصيل</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">المميزات الرئيسية</h3>
              <ul className="list-disc mr-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">المواصفات التفصيلية</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-4 border-b font-medium">{key}</td>
                        <td className="py-3 px-4 border-b">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-4xl font-bold">{product.rating}</p>
                  <div className="text-amber-500 mt-1">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{product.reviewCount} تقييم</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm w-4">5</span>
                    <div className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">70%</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm w-4">4</span>
                    <div className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm w-4">3</span>
                    <div className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '5%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">5%</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm w-4">2</span>
                    <div className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '3%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-4">1</span>
                    <div className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '2%' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">2%</span>
                  </div>
                </div>
                <div>
                  <Button>اكتب تقييماً</Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Sample reviews */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">أ</span>
                        </div>
                        <div>
                          <p className="font-medium">أحمد محمد</p>
                          <p className="text-xs text-muted-foreground">منذ شهر واحد</p>
                        </div>
                      </div>
                      <div className="text-amber-500">{"★".repeat(5)}</div>
                    </div>
                    <p>منتج رائع جداً، سريع وبطارية تدوم طويلاً. التصميم جميل والكاميرا ممتازة للتصوير اليومي. أنصح به بشدة.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">س</span>
                        </div>
                        <div>
                          <p className="font-medium">سارة علي</p>
                          <p className="text-xs text-muted-foreground">منذ شهرين</p>
                        </div>
                      </div>
                      <div className="text-amber-500">{"★".repeat(4)}</div>
                    </div>
                    <p>جودة المنتج جيدة لكن الشحن كان بطيء قليلاً. الأداء ممتاز والسعر مناسب جداً مقارنة بالمواصفات.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <Button variant="outline">عرض المزيد من التقييمات</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping">
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-xl font-semibold">معلومات الشحن والتوصيل</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">وقت التوصيل</h4>
                  <p>يتم توصيل الطلبات داخل صنعاء خلال 1-3 أيام عمل، وللمدن الأخرى خلال 3-7 أيام عمل.</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">تكلفة التوصيل</h4>
                  <p>رسوم التوصيل داخل صنعاء: 1,000 ر.ي</p>
                  <p>رسوم التوصيل للمدن الأخرى: 3,000 - 5,000 ر.ي حسب المدينة</p>
                  <p className="text-primary mt-2">التوصيل مجاني للطلبات أكثر من 25,000 ر.ي</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">سياسة الاسترجاع</h4>
                  <p>يمكنك إرجاع المنتج خلال 7 أيام من تاريخ الاستلام إذا كان به عيب مصنعي.</p>
                  <p>لا يمكن استرجاع المنتجات التي تم فتحها أو استخدامها إلا في حال وجود عيب مصنعي.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">شركاء التوصيل</h4>
                  <div className="flex gap-4 mt-4">
                    <img src="https://placehold.co/120x40/e6e6e6/1a4d2e?text=توصيل+سريع" alt="توصيل سريع" className="h-8" />
                    <img src="https://placehold.co/120x40/e6e6e6/1a4d2e?text=واصل" alt="واصل" className="h-8" />
                    <img src="https://placehold.co/120x40/e6e6e6/1a4d2e?text=يمن+إكسبرس" alt="يمن إكسبرس" className="h-8" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">منتجات مشابهة</h2>
            <Link to={`/categories/${product.category.toLowerCase()}`} className="text-primary hover:underline flex items-center">
              عرض الكل
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* We'd show related products here - placeholder for now */}
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-square">
                  <img 
                    src={`https://placehold.co/400x400/e6e6e6/1a4d2e?text=منتج+مشابه+${index + 1}`}
                    alt={`منتج مشابه ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1">منتج مشابه {index + 1}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold">{(70000 + index * 5000).toLocaleString()} ر.ي</p>
                    <div className="text-amber-500 text-sm">{"★".repeat(4)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}