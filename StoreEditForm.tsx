import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { User, useAuth } from '@/lib/auth';

const storeFormSchema = z.object({
  storeName: z.string().min(3, 'اسم المتجر يجب أن يكون 3 أحرف على الأقل'),
  storeDescription: z.string().optional(),
  storeAddress: z.string().min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل').optional(),
  phone: z.string().regex(/^\d{9}$/, 'رقم الهاتف يجب أن يتكون من 9 أرقام')
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function StoreEditForm({ onSuccess, onCancel }: Props) {
  const { user, users } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form with default values from current user
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: user?.storeName || '',
      storeDescription: user?.storeDescription || '',
      storeAddress: user?.storeAddress || '',
      phone: user?.phone || ''
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: StoreFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Use the auth store's updateStoreInfo method
      await useAuth.getState().updateStoreInfo(user.id, {
        storeName: data.storeName,
        storeDescription: data.storeDescription,
        storeAddress: data.storeAddress,
        phone: data.phone
      });
      
      toast({
        title: "تم التحديث",
        description: "تم تحديث بيانات المتجر بنجاح",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء تحديث بيانات المتجر",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>تعديل بيانات المتجر</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المتجر</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم المتجر" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="storeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف المتجر</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="وصف قصير عن متجرك ومنتجاتك" 
                      className="min-h-[100px]" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="storeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان المتجر</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="العنوان التفصيلي للمتجر" 
                      {...field} 
                      value={field.value || ''}
                    />
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
                    <div className="flex items-center">
                      <div className="bg-muted px-3 py-2 border border-input rounded-l-md">
                        +967
                      </div>
                      <Input 
                        placeholder="رقم الهاتف بدون الرمز الدولي" 
                        className="rounded-r-md rounded-l-none" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              إلغاء
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}