import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

type Category = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

export function FeaturedCategories() {
  const categories: Category[] = [
    {
      id: "1",
      name: "إلكترونيات",
      image: "https://placehold.co/300x200/e6e6e6/1a4d2e?text=إلكترونيات",
      slug: "electronics"
    },
    {
      id: "2",
      name: "أزياء",
      image: "https://placehold.co/300x200/e6e6e6/1a4d2e?text=أزياء",
      slug: "fashion"
    },
    {
      id: "3",
      name: "منزل ومطبخ",
      image: "https://placehold.co/300x200/e6e6e6/1a4d2e?text=منزل+ومطبخ",
      slug: "home-kitchen"
    },
    {
      id: "4",
      name: "هواتف وأجهزة لوحية",
      image: "https://placehold.co/300x200/e6e6e6/1a4d2e?text=هواتف",
      slug: "phones-tablets"
    },
    {
      id: "5",
      name: "مستلزمات أطفال",
      image: "https://placehold.co/300x200/e6e6e6/1a4d2e?text=أطفال",
      slug: "kids"
    },
    {
      id: "6",
      name: "أغذية ومشروبات",
      image: "https://placehold.co/300x200/e6e6e6/1a4d2e?text=أغذية",
      slug: "food-beverages"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">تسوق حسب التصنيف</h2>
          <p className="text-muted-foreground mt-2">اكتشف منتجات فريدة في كل فئة</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.slug}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end">
                      <div className="w-full p-3 text-center bg-white/90">
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}