import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const { verifyEmail, resendVerificationCode } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get userId and email from URL params
    const searchParams = new URLSearchParams(location.search);
    const userIdParam = searchParams.get('userId');
    const emailParam = searchParams.get('email');
    
    if (userIdParam) setUserId(userIdParam);
    if (emailParam) setEmail(emailParam);
  }, [location]);

  useEffect(() => {
    // Set up cooldown timer for resend button
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (!userId) {
      toast({
        title: "خطأ",
        description: "بيانات المستخدم غير متوفرة",
        variant: "destructive",
      });
      return;
    }
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رمز التحقق المكون من 6 أرقام",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await verifyEmail(userId, verificationCode);
      if (success) {
        toast({
          title: "تم بنجاح",
          description: "تم تفعيل حسابك بنجاح، جاري تحويلك إلى الصفحة الرئيسية",
        });
        
        // Redirect to home page after successful verification
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء التحقق من رمز التفعيل",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    if (!email) {
      toast({
        title: "خطأ",
        description: "البريد الإلكتروني غير متوفر",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await resendVerificationCode(email);
      
      toast({
        title: "تم إرسال الرمز",
        description: "تم إرسال رمز تحقق جديد إلى بريدك الإلكتروني",
      });
      
      // Set cooldown timer for resend button (60 seconds)
      setTimeLeft(60);
    } catch (error) {
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء إرسال رمز التحقق",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10 flex justify-center">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>تفعيل الحساب</CardTitle>
              <CardDescription>
                تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="أدخل رمز التحقق"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-xl tracking-widest"
                  autoComplete="one-time-code"
                  maxLength={6}
                />
                
                <div className="text-sm text-center text-muted-foreground mt-2">
                  أدخل رمز التحقق المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleVerify} 
                disabled={isLoading || !verificationCode || verificationCode.length !== 6}
              >
                {isLoading ? "جاري التحقق..." : "تأكيد"}
              </Button>
              
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={handleResendCode}
                  disabled={isLoading || timeLeft > 0}
                >
                  {timeLeft > 0 
                    ? `إعادة إرسال الرمز (${timeLeft})`
                    : "لم يصلك الرمز؟ إعادة إرسال"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}