import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

export function VerificationBanner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Don't show for verified users or non-authenticated users
  if (!user || user.isVerified !== false) {
    return null;
  }
  
  return (
    <Alert variant="warning" className="mb-0 rounded-none border-b border-amber-500 bg-amber-50 px-6 py-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="text-amber-800">
            لم يتم تفعيل حسابك بعد. يرجى تفعيل حسابك من خلال رمز التحقق المرسل إلى بريدك الإلكتروني.
          </AlertDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100"
          onClick={() => navigate(`/verify?userId=${user.id}&email=${encodeURIComponent(user.email)}`)}
        >
          تفعيل الحساب
        </Button>
      </div>
    </Alert>
  );
}