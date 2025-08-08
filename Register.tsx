import { useState } from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { VendorRegisterForm } from '@/components/auth/VendorRegisterForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Store, User } from 'lucide-react';

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('customer');

  return (
    <MainLayout>
      <div className="container mx-auto py-10 flex justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>إنشاء حساب جديد</CardTitle>
              <CardDescription>اختر نوع الحساب الذي تريد إنشاءه</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="customer" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-6">
                  <TabsTrigger value="customer" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>عميل</span>
                  </TabsTrigger>
                  <TabsTrigger value="vendor" className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    <span>متجر</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer">
                  <RegisterForm />
                </TabsContent>
                
                <TabsContent value="vendor">
                  <VendorRegisterForm />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center">
                لديك حساب بالفعل؟{" "}
                <Button variant="link" className="px-0" asChild>
                  <Link to="/login">تسجيل الدخول</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}