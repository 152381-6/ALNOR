import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

interface VerificationNotificationProps {
  email?: string;
  userId?: string;
}

export function VerificationNotification({ email, userId }: VerificationNotificationProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Don't show for verified users
  if (!user || user.isVerified !== false) {
    return null;
  }
  
  const handleVerify = () => {
    if (userId && email) {
      navigate(`/verify?userId=${userId}&email=${encodeURIComponent(email)}`);
    } else {
      navigate('/verify');
    }
  };
  
  return (
    <Alert className="mb-4 border-amber-500">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-500">تنبيه</AlertTitle>
      <div className="flex justify-between items-center">
        <AlertDescription>
          لم يتم تفعيل حسابك بعد. يرجى تفعيل حسابك من خلال رمز التحقق المرسل إلى بريدك الإلكتروني.
        </AlertDescription>
        <Button variant="outline" className="border-amber-500 text-amber-500" onClick={handleVerify}>
          تفعيل الحساب
        </Button>
      </div>
    </Alert>
  );
}