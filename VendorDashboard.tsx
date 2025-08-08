import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ShoppingBag, Users, Settings, TrendingUp, Activity } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Separator } from '@/components/ui/separator';
import { StoreEditForm } from '@/components/vendor/StoreEditForm';

export default function VendorDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editingStore, setEditingStore] = useState(false);
  
  // Protect this route - only authenticated vendors can access
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'vendor') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!user || user.role !== 'vendor') {
    return null;
  }
  
  const handleEditSuccess = () => {
    setEditingStore(false);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">لوحة تحكم المتجر</h1>
            <p className="text-muted-foreground">مرحباً {user.name}، مرحباً بك في لوحة تحكم متجرك</p>
          </div>
          
          {/* Store Info Card */}
          {editingStore ? (
            <StoreEditForm 
              onSuccess={handleEditSuccess}
              onCancel={() => setEditingStore(false)}
            />
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{user.storeName}</CardTitle>
                <CardDescription>{user.storeDescription || 'لا يوجد وصف للمتجر'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">العنوان</p>
                    <p className="text-sm text-muted-foreground">{user.storeAddress || 'لم يتم تحديد عنوان'}</p>
                  </div>
                  <Button variant="outline" onClick={() => setEditingStore(true)}>تعديل بيانات المتجر</Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Analytics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">المبيعات اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-muted-foreground ml-2" />
                  <div>
                    <div className="text-2xl font-bold">0 ر.ي</div>
                    <p className="text-xs text-muted-foreground">+0% من أمس</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">الطلبات الجديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground ml-2" />
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">لا توجد طلبات جديدة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">المنتجات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Package className="h-4 w-4 text-muted-foreground ml-2" />
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">لا توجد منتجات</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">زوار المتجر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground ml-2" />
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">لا يوجد زوار</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>المنتجات</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>الطلبات</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>التحليلات</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>الإعدادات</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>المنتجات</CardTitle>
                    <Button>إضافة منتج جديد</Button>
                  </div>
                  <CardDescription>إدارة منتجات متجرك</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">لا توجد منتجات</h3>
                    <p className="text-muted-foreground mb-4">لم تقم بإضافة أي منتجات حتى الآن</p>
                    <Button>إضافة منتج الآن</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>الطلبات</CardTitle>
                  <CardDescription>إدارة طلبات العملاء</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">لا توجد طلبات</h3>
                    <p className="text-muted-foreground mb-4">لم يتم تلقي أي طلبات بعد</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>التحليلات</CardTitle>
                  <CardDescription>تحليلات ومبيعات المتجر</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Activity className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">لا توجد بيانات</h3>
                    <p className="text-muted-foreground mb-4">لا توجد بيانات كافية لعرض التحليلات</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات المتجر</CardTitle>
                  <CardDescription>تعديل إعدادات متجرك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {editingStore ? (
                    <StoreEditForm
                      onSuccess={handleEditSuccess}
                      onCancel={() => setEditingStore(false)}
                    />
                  ) : (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">بيانات المتجر</h3>
                      <Separator className="my-2" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">اسم المتجر</p>
                          <p className="text-sm text-muted-foreground">{user.storeName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">عنوان المتجر</p>
                          <p className="text-sm text-muted-foreground">{user.storeAddress || 'غير محدد'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">البريد الإلكتروني</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">رقم الهاتف</p>
                          <p className="text-sm text-muted-foreground">+967 {user.phone}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setEditingStore(true)}
                      >
                        تعديل بيانات المتجر
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}