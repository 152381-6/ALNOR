import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navigate } from 'react-router-dom';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يحتوي على حرفين على الأقل' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صالح' }).optional(),
  phone: z.string().regex(/^\d{9}$/, { message: 'رقم الهاتف يجب أن يتكون من 9 أرقام' }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });
  
  // Update form values when user data is available
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user, form]);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);
    
    // In a real app, this would update the user profile
    setTimeout(() => {
      toast({
        title: 'تم تحديث الملف الشخصي',
        description: 'تم حفظ التغييرات بنجاح',
      });
      setIsLoading(false);
    }, 1000);
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-2xl">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription className="mt-2 flex flex-col gap-1">
                  <div>{user?.email}</div>
                  <div>{user?.phone && `+967 ${user.phone}`}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    الملف الشخصي
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    طلباتي
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    المفضلة
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    العناوين
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-500">
                    تسجيل الخروج
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
                <CardDescription>تحديث بياناتك الشخصية</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@example.com" {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                +967
                              </span>
                              <Input
                                type="tel"
                                className="rounded-l-none"
                                placeholder="7XXXXXXXX"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}