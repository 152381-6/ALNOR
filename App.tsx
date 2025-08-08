import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import VendorDashboard from './pages/VendorDashboard';
import Verify from './pages/Verify';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;