import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-800 pt-12 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-2xl text-primary">دكان</h3>
            <p className="text-sm text-muted-foreground">
              منصة تسويق إلكتروني في اليمن تربط بين المتاجر والمشترين، وتوفر خدمات التوصيل بالشراكة مع شركات الشحن المحلية.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">فيسبوك</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">انستغرام</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">تويتر</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">يوتيوب</span>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">روابط مهمة</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-primary">عن دكان</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary">اتصل بنا</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-primary">وظائف</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-primary">المدونة</Link></li>
              <li><Link to="/faqs" className="text-sm hover:text-primary">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">للبائعين والمتاجر</h4>
            <ul className="space-y-2">
              <li><Link to="/sell-on-dokan" className="text-sm hover:text-primary">بيع على دكان</Link></li>
              <li><Link to="/seller-registration" className="text-sm hover:text-primary">تسجيل متجر</Link></li>
              <li><Link to="/partner-with-us" className="text-sm hover:text-primary">شراكات</Link></li>
              <li><Link to="/delivery-partners" className="text-sm hover:text-primary">شركات التوصيل</Link></li>
              <li><Link to="/advertising" className="text-sm hover:text-primary">الإعلان على دكان</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">النشرة البريدية</h4>
            <p className="text-sm text-muted-foreground mb-4">اشترك في نشرتنا البريدية للحصول على أحدث العروض والخصومات</p>
            <div className="flex gap-2">
              <Input placeholder="البريد الإلكتروني" type="email" className="bg-white" />
              <Button className="bg-primary hover:bg-primary/90">اشتراك</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} دكان. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}