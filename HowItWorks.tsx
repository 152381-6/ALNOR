import { ArrowDown, ArrowUpRight, ShoppingBag, Truck, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      title: "تصفح واختر منتجاتك",
      description: "تصفح آلاف المنتجات من مختلف المتاجر المحلية واختر ما يناسبك"
    },
    {
      id: 2,
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "أتمم عملية الشراء",
      description: "اختر طريقة الدفع المناسبة لك سواء عند الاستلام أو الكاش أو الدفع الإلكتروني"
    },
    {
      id: 3,
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "استلم طلبك",
      description: "يصلك طلبك مباشرة إلى باب منزلك عبر شركائنا في التوصيل"
    },
    {
      id: 4,
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "استمتع بتجربة التسوق",
      description: "قيّم المنتجات والمتاجر وشارك تجربتك مع الآخرين"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      role: "مشتري",
      comment: "منصة دكان سهلت علي التسوق من منزلي، المنتجات أصلية والتوصيل سريع جداً، تجربة ممتازة!",
      avatar: "https://placehold.co/100x100/e6e6e6/1a4d2e?text=أ"
    },
    {
      id: 2,
      name: "سارة علي",
      role: "مالكة متجر",
      comment: "انضممت لدكان كبائعة منذ أشهر، ساعدني في الوصول لعملاء جدد وزيادة مبيعاتي بشكل ملحوظ.",
      avatar: "https://placehold.co/100x100/e6e6e6/1a4d2e?text=س"
    },
    {
      id: 3,
      name: "خالد عمر",
      role: "مشتري",
      comment: "أفضل ما في دكان هو تنوع المنتجات والأسعار المنافسة. أصبح خياري الأول للتسوق الإلكتروني.",
      avatar: "https://placehold.co/100x100/e6e6e6/1a4d2e?text=خ"
    }
  ];

  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "منتجات متنوعة",
      description: "آلاف المنتجات من مختلف الفئات تلبي جميع احتياجاتك"
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "توصيل سريع",
      description: "توصيل سريع وآمن لمنتجاتك إلى باب منزلك"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "طرق دفع متعددة",
      description: "خيارات دفع متنوعة تناسب الجميع"
    }
  ];

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">كيف يعمل دكان؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              منصة دكان تربط بينك وبين أفضل المتاجر المحلية في اليمن بخطوات بسيطة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center items-center bg-primary/10 h-20 w-20 rounded-full mb-6">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[-30%] w-3/5 transform rotate-0">
                    <ArrowDown className="w-6 h-6 text-gray-400 md:hidden" />
                    <ArrowUpRight className="w-6 h-6 text-gray-400 hidden md:block rotate-[135deg]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link to="/how-it-works">معلومات أكثر</Link>
            </Button>
          </div>
        </div>
      </section>
    
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              آراء حقيقية من مستخدمين وبائعين على منصة دكان
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.comment}</p>
                <div className="mt-4 text-amber-500">{"★".repeat(5)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">منصة تسوق إلكتروني مصممة خصيصاً لليمن</h2>
              <p className="mb-8">
                نهدف في دكان إلى تسهيل التجارة الإلكترونية في اليمن من خلال ربط البائعين بالمشترين وتوفير خدمات توصيل موثوقة وسريعة.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-1">{feature.title}</h3>
                      <p className="text-white/80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/about">تعرف علينا أكثر</Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://placehold.co/600x400/e6e6e6/1a4d2e?text=منصة+دكان" 
                alt="منصة دكان"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}