import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يحتوي على حرفين على الأقل' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صالح' }),
  phone: z.string().regex(/^\d{9}$/, { message: 'رقم الهاتف يجب أن يتكون من 9 أرقام' }),
  password: z.string().min(8, { message: 'كلمة المرور يجب أن تتكون من 8 أحرف على الأقل' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);
    
    try {
      // Register as a customer (explicitly set role to 'customer')
      const { userId, verificationCode } = await register(
        values.name, 
        values.email, 
        values.phone, 
        values.password,
        'customer'
      );
      
      toast({
        title: 'تم التسجيل بنجاح',
        description: 'تم إرسال رمز تحقق إلى بريدك الإلكتروني',
      });
      
      // Navigate to verification page with userId and email
      navigate(`/verify?userId=${userId}&email=${encodeURIComponent(values.email)}`);
      
      // For demo purposes, show the verification code (remove in production)
      console.log('Verification code:', verificationCode);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'فشل التسجيل',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء التسجيل',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
                <Input type="email" placeholder="example@example.com" {...field} />
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
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'جاري التسجيل...' : 'إنشاء حساب'}
        </Button>
      </form>
    </Form>
  );
}