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

const loginSchema = z.object({
  emailOrPhone: z.string().min(1, { message: 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف' }),
  password: z.string().min(1, { message: 'يرجى إدخال كلمة المرور' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });
  
  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    
    try {
      await login(values.emailOrPhone, values.password);
      
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحباً بك مجدداً في دكان!',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'فشل تسجيل الدخول',
        description: error instanceof Error ? error.message : 'بيانات الدخول غير صحيحة',
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
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني أو رقم الهاتف</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com / 7XXXXXXXX" {...field} />
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
        
        <div className="text-sm">
          <Button variant="link" className="px-0 font-normal" onClick={() => navigate('/forgot-password')}>
            نسيت كلمة المرور؟
          </Button>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </form>
    </Form>
  );
}