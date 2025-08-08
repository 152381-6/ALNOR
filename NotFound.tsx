import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="container flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
        </p>
        <Button size="lg" asChild>
          <Link to="/">العودة إلى الصفحة الرئيسية</Link>
        </Button>
      </div>
    </MainLayout>
  );
}