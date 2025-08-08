import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Filter, ChevronDown, Check, SlidersHorizontal, Grid3x3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Mock categories data
const categories = {
  "electronics": {
    name: "إلكترونيات",
    subCategories: ["هواتف ذكية", "حواسيب محمولة", "أجهزة لوحية", "سماعات", "أجهزة منزلية"],
    brands: ["سامسونج", "آبل", "هواوي", "شاومي", "لينوفو", "ديل", "إتش بي"],
  },
  "fashion": {
    name: "أزياء",
    subCategories: ["ملابس رجالية", "ملابس نسائية", "أحذية", "حقائب", "إكسسوارات"],
    brands: ["زارا", "نايك", "أديداس", "بوما", "إتش أند إم", "جوتشي"]
  },
  "home": {
    name: "منزل ومفروشات",
    subCategories: ["أثاث", "مستلزمات المطبخ", "منسوجات منزلية", "إضاءة", "تخزين وتنظيم"],
    brands: ["إيكيا", "هوم سنتر", "هوم بوكس", "سيتي دبليو"]
  }
};

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "هاتف ذكي - سامسونج جالاكسي A54",
    slug: "samsung-galaxy",
    price: 85000,
    originalPrice: 95000,
    rating: 4.5,
    reviewCount: 128,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=هاتف+سامسونج",
    brand: "سامسونج",
    subCategory: "هواتف ذكية",
    inStock: true,
  },
  {
    id: "2",
    name: "حاسوب محمول - لينوفو IdeaPad 5",
    slug: "lenovo-laptop",
    price: 220000,
    rating: 4.2,
    reviewCount: 76,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=لابتوب+لينوفو",
    brand: "لينوفو",
    subCategory: "حواسيب محمولة",
    inStock: true,
  },
  {
    id: "3",
    name: "سماعات لاسلكية - إيربودز برو",
    slug: "airpods-pro",
    price: 45000,
    originalPrice: 55000,
    rating: 4.8,
    reviewCount: 203,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=سماعات+لاسلكية",
    brand: "آبل",
    subCategory: "سماعات",
    inStock: false,
  },
  {
    id: "4",
    name: "تابلت - شاومي باد 5",
    slug: "xiaomi-pad-5",
    price: 110000,
    rating: 4.3,
    reviewCount: 89,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=تابلت+شاومي",
    brand: "شاومي",
    subCategory: "أجهزة لوحية",
    inStock: true,
  },
  {
    id: "5",
    name: "هاتف ذكي - آيفون 14",
    slug: "iphone-14",
    price: 320000,
    rating: 4.7,
    reviewCount: 176,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=آيفون+14",
    brand: "آبل",
    subCategory: "هواتف ذكية",
    inStock: true,
  },
  {
    id: "6",
    name: "لابتوب - ماك بوك اير",
    slug: "macbook-air",
    price: 450000,
    originalPrice: 480000,
    rating: 4.9,
    reviewCount: 142,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=ماك+بوك",
    brand: "آبل",
    subCategory: "حواسيب محمولة",
    inStock: true,
  },
  {
    id: "7",
    name: "سماعات - JBL فليب 5",
    slug: "jbl-flip-5",
    price: 35000,
    rating: 4.1,
    reviewCount: 68,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=سماعات+JBL",
    brand: "JBL",
    subCategory: "سماعات",
    inStock: true,
  },
  {
    id: "8",
    name: "هاتف ذكي - هواوي P40",
    slug: "huawei-p40",
    price: 120000,
    originalPrice: 135000,
    rating: 4.0,
    reviewCount: 112,
    image: "https://placehold.co/400x400/e6e6e6/1a4d2e?text=هاتف+هواوي",
    brand: "هواوي",
    subCategory: "هواتف ذكية",
    inStock: true,
  }
];

type ViewMode = "grid" | "list";
type SortOption = "featured" | "price-low" | "price-high" | "newest" | "rating";

const sortOptions: Record<SortOption, string> = {
  "featured": "الأكثر شيوعاً",
  "price-low": "السعر: من الأقل إلى الأعلى",
  "price-high": "السعر: من الأعلى إلى الأقل",
  "newest": "الأحدث أولاً",
  "rating": "أعلى تقييم"
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [showInStockOnly, setShowInStockOnly] = useState<boolean>(false);

  // Get category data based on the URL parameter
  const categoryData = category ? categories[category as keyof typeof categories] : null;

  // Filter products based on selected category and filters
  const filteredProducts = mockProducts.filter(product => {
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Filter by brand if any selected
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Filter by subcategory if any selected
    if (selectedSubCategories.length > 0 && !selectedSubCategories.includes(product.subCategory)) {
      return false;
    }

    // Filter by stock status
    if (showInStockOnly && !product.inStock) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    // For "featured" and "newest", we'll just use the original order for this mock
    return 0;
  });

  const toggleBrandSelection = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleSubCategorySelection = (subCategory: string) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCategory)
        ? prev.filter(sc => sc !== subCategory)
        : [...prev, subCategory]
    );
  };

  if (!categoryData) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">فئة غير موجودة</h1>
          <p className="mb-6">عذراً، لا يمكن العثور على الفئة التي تبحث عنها.</p>
          <Button asChild>
            <Link to="/">العودة إلى الصفحة الرئيسية</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const clearAllFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedBrands([]);
    setSelectedSubCategories([]);
    setShowInStockOnly(false);
  };

  const activeFilterCount = selectedBrands.length + 
    selectedSubCategories.length + 
    (showInStockOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0);

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          {" / "}
          <span>{categoryData.name}</span>
        </div>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryData.name}</h1>
            <p className="text-muted-foreground">تسوق أفضل منتجات {categoryData.name} من متاجر يمنية موثوقة</p>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="w-full md:w-auto flex gap-2">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 md:hidden">
                  <Filter className="h-4 w-4" />
                  فلترة
                  {activeFilterCount > 0 && (
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center">{activeFilterCount}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto" side="right">
                <SheetHeader>
                  <SheetTitle>فلترة المنتجات</SheetTitle>
                  <SheetDescription>
                    استخدم هذه الخيارات لتصفية نتائج البحث
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Price Range Filter */}
                  <div>
                    <h3 className="font-medium mb-3">السعر</h3>
                    <div className="space-y-6 px-1">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={500000}
                        step={5000}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <span>{priceRange[0].toLocaleString()} ر.ي</span>
                        <span>{priceRange[1].toLocaleString()} ر.ي</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  {/* Subcategories Filter */}
                  <div>
                    <h3 className="font-medium mb-3">الأقسام الفرعية</h3>
                    <div className="space-y-2">
                      {categoryData.subCategories.map((subCategory) => (
                        <div key={subCategory} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Checkbox 
                            id={`subcat-${subCategory}`}
                            checked={selectedSubCategories.includes(subCategory)}
                            onCheckedChange={() => toggleSubCategorySelection(subCategory)}
                          />
                          <Label 
                            htmlFor={`subcat-${subCategory}`}
                            className="cursor-pointer w-full text-sm"
                          >
                            {subCategory}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  {/* Brands Filter */}
                  <div>
                    <h3 className="font-medium mb-3">الماركات</h3>
                    <div className="space-y-2">
                      {categoryData.brands.map((brand) => (
                        <div key={brand} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Checkbox 
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrandSelection(brand)}
                          />
                          <Label 
                            htmlFor={`brand-${brand}`}
                            className="cursor-pointer w-full text-sm"
                          >
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  {/* Stock Status Filter */}
                  <div>
                    <h3 className="font-medium mb-3">التوفر</h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox 
                        id="in-stock"
                        checked={showInStockOnly}
                        onCheckedChange={() => setShowInStockOnly(!showInStockOnly)}
                      />
                      <Label 
                        htmlFor="in-stock"
                        className="cursor-pointer w-full text-sm"
                      >
                        عرض المنتجات المتوفرة فقط
                      </Label>
                    </div>
                  </div>
                </div>
                <SheetFooter className="mt-6 flex flex-row gap-2 justify-between">
                  <Button variant="outline" onClick={clearAllFilters}>مسح الفلاتر</Button>
                  <SheetClose asChild>
                    <Button>تطبيق</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Desktop Filter Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  فلترة
                  {activeFilterCount > 0 && (
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center">{activeFilterCount}</Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => setPriceRange([0, 100000])}>
                  أقل من 100,000 ر.ي
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceRange([100000, 200000])}>
                  100,000 - 200,000 ر.ي
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceRange([200000, 500000])}>
                  أكثر من 200,000 ر.ي
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowInStockOnly(!showInStockOnly)}>
                  {showInStockOnly ? "عرض جميع المنتجات" : "المتوفر فقط"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={clearAllFilters}>
                  مسح الفلاتر
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 md:flex-none flex items-center gap-2">
                  ترتيب حسب: {sortOptions[sortBy]}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {Object.entries(sortOptions).map(([key, label]) => (
                  <DropdownMenuItem 
                    key={key}
                    onClick={() => setSortBy(key as SortOption)}
                    className="flex items-center justify-between"
                  >
                    {label}
                    {key === sortBy && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* View Mode Toggle */}
            <div className="hidden md:flex border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-r-none ${viewMode === "grid" ? "bg-secondary" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
                <span className="sr-only">عرض شبكي</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-l-none ${viewMode === "list" ? "bg-secondary" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">عرض قائمة</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {priceRange[0] > 0 || priceRange[1] < 500000 && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                السعر: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ر.ي
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setPriceRange([0, 500000])}
                >
                  ×
                </Button>
              </Badge>
            )}
            
            {selectedBrands.map(brand => (
              <Badge key={brand} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {brand}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => toggleBrandSelection(brand)}
                >
                  ×
                </Button>
              </Badge>
            ))}

            {selectedSubCategories.map(subCategory => (
              <Badge key={subCategory} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {subCategory}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => toggleSubCategorySelection(subCategory)}
                >
                  ×
                </Button>
              </Badge>
            ))}

            {showInStockOnly && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                متوفر فقط
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setShowInStockOnly(false)}
                >
                  ×
                </Button>
              </Badge>
            )}

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-primary"
              onClick={clearAllFilters}
            >
              مسح الكل
            </Button>
          </div>
        )}

        {/* Product Grid or List */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">لا توجد منتجات</h2>
            <p className="text-muted-foreground">لا توجد منتجات تطابق معايير البحث. جرب تغيير الفلاتر.</p>
            <Button className="mt-4" onClick={clearAllFilters}>عرض جميع المنتجات</Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <Link to={`/products/${product.slug}`}>
                  <div className="relative aspect-square">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">غير متوفر</Badge>
                      </div>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">
                        خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2 h-12">{product.name}</h3>
                    <div className="flex items-center gap-2 text-amber-500 mt-1 text-sm">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                      <span className="text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <div>
                        <p className="font-bold">{product.price.toLocaleString()} ر.ي</p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString()} ر.ي
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedProducts.map((product) => (
              <Card key={product.id}>
                <div className="flex flex-col sm:flex-row">
                  <Link to={`/products/${product.slug}`} className="sm:w-1/4 relative">
                    <div className="aspect-square relative">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {!product.inStock && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">غير متوفر</Badge>
                        </div>
                      )}
                      {product.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">
                          خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-4 sm:p-6 sm:w-3/4 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                      <Link to={`/products/${product.slug}`}>
                        <h3 className="font-medium text-lg">{product.name}</h3>
                      </Link>
                      <Badge variant="outline">{product.brand}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-amber-500 mt-1 mb-2 text-sm">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                      <span className="text-muted-foreground">({product.reviewCount} تقييم)</span>
                    </div>
                    <div className="mt-auto flex flex-wrap sm:flex-nowrap gap-3 items-center justify-between">
                      <div>
                        <p className="font-bold text-xl">{product.price.toLocaleString()} ر.ي</p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString()} ر.ي
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" asChild>
                          <Link to={`/products/${product.slug}`}>عرض التفاصيل</Link>
                        </Button>
                        <Button disabled={!product.inStock}>
                          إضافة إلى السلة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button variant="outline" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
              1
            </Button>
            <Button variant="outline" size="icon">
              2
            </Button>
            <Button variant="outline" size="icon">
              3
            </Button>
            <Button variant="outline" size="icon">
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </Button>
          </nav>
        </div>
      </div>
    </MainLayout>
  );
}