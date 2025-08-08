import { LoginForm } from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-10 flex justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>تسجيل الدخول</CardTitle>
              <CardDescription>أدخل بياناتك للدخول إلى حسابك</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center">
                ليس لديك حساب؟{" "}
                <Button variant="link" className="px-0" asChild>
                  <Link to="/register">إنشاء حساب جديد</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}