import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Star, Map } from "lucide-react";

type Store = {
  id: string;
  name: string;
  logo: string;
  category: string;
  rating: number;
  location: string;
  featured?: boolean;
  slug: string;
};

export function StoresSection() {
  const stores: Store[] = [
    {
      id: "1",
      name: "إلكترونيات المستقبل",
      logo: "https://placehold.co/200x200/e6e6e6/1a4d2e?text=المستقبل",
      category: "إلكترونيات",
      rating: 4.8,
      location: "صنعاء - شارع الزبيري",
      featured: true,
      slug: "future-electronics"
    },
    {
      id: "2",
      name: "أزياء الشرق",
      logo: "https://placehold.co/200x200/e6e6e6/1a4d2e?text=أزياء+الشرق",
      category: "أزياء",
      rating: 4.6,
      location: "عدن - المنصورة",
      featured: true,
      slug: "east-fashion"
    },
    {
      id: "3",
      name: "ماركت اليمن",
      logo: "https://placehold.co/200x200/e6e6e6/1a4d2e?text=ماركت+اليمن",
      category: "بقالة",
      rating: 4.7,
      location: "تعز - شارع جمال",
      featured: true,
      slug: "yemen-market"
    },
    {
      id: "4",
      name: "ديكور المنزل",
      logo: "https://placehold.co/200x200/e6e6e6/1a4d2e?text=ديكور",
      category: "أثاث ومفروشات",
      rating: 4.5,
      location: "الحديدة - شارع صنعاء",
      slug: "home-decor"
    }
  ];

  const deliveryPartners = [
    {
      id: "1",
      name: "توصيل سريع",
      logo: "https://placehold.co/200x80/e6e6e6/1a4d2e?text=توصيل+سريع",
      cities: ["صنعاء", "عدن", "تعز", "الحديدة"]
    },
    {
      id: "2",
      name: "شركة واصل",
      logo: "https://placehold.co/200x80/e6e6e6/1a4d2e?text=واصل",
      cities: ["صنعاء", "تعز", "إب", "ذمار"]
    },
    {
      id: "3",
      name: "يمن إكسبرس",
      logo: "https://placehold.co/200x80/e6e6e6/1a4d2e?text=يمن+إكسبرس",
      cities: ["صنعاء", "عدن", "المكلا", "سيئون"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">متاجر مميزة</h2>
            <Link to="/stores" className="text-primary hover:underline font-medium flex items-center">
              عرض كل المتاجر
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stores.map((store) => (
              <Link key={store.id} to={`/stores/${store.slug}`}>
                <Card className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-0">
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img 
                          src={store.logo} 
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-lg mb-1">{store.name}</h3>
                      <Badge variant="secondary" className="mb-2">
                        {store.category}
                      </Badge>
                      <div className="flex items-center text-amber-500 mb-2">
                        <span className="text-xs font-medium ml-1">{store.rating}</span>
                        <Star className="fill-amber-500 text-amber-500 h-4 w-4" />
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Map className="h-3 w-3 mr-1" />
                        {store.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">شركاء التوصيل</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نتعاون مع أفضل شركات التوصيل في اليمن لضمان وصول منتجاتك بأمان وسرعة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryPartners.map((partner) => (
              <Card key={partner.id} className="bg-gray-50">
                <CardContent className="p-6">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-12 mb-4"
                  />
                  <h3 className="font-medium text-lg mb-2">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">يغطي {partner.cities.length} مدن في اليمن</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.cities.map((city) => (
                      <Badge key={city} variant="outline">{city}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/delivery-partners">معلومات أكثر عن شركاء التوصيل</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}