import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const cartItemCount = 0; // This would be managed by a cart context/state

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "التصنيفات", href: "/categories" },
    { name: "العروض", href: "/offers" },
    { name: "المتاجر", href: "/stores" },
    { name: "كيف يعمل", href: "/how-it-works" },
  ];

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 text-lg">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="flex items-center p-2 hover:text-primary">
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    <Link to="/account/profile" className="flex items-center p-2 hover:text-primary">
                      الملف الشخصي
                    </Link>
                    {user?.role === 'vendor' && (
                      <Link to="/vendor/dashboard" className="flex items-center p-2 hover:text-primary">
                        لوحة تحكم المتجر
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center p-2 hover:text-primary">
                      تسجيل الدخول
                    </Link>
                    <Link to="/register" className="flex items-center p-2 hover:text-primary">
                      إنشاء حساب
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl text-primary">دكان</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm font-medium hover:text-primary">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className={cn("relative", isSearchOpen ? "flex" : "hidden md:flex")}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0 top-0 h-full rounded-r-none" 
              onClick={() => setIsSearchOpen(false)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">بحث</span>
            </Button>
            <Input 
              placeholder="ابحث عن المنتجات..." 
              className="w-[200px] lg:w-[300px] pr-9 pl-2 rounded-sm"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            <span className="sr-only">بحث</span>
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account/profile" className="cursor-pointer w-full">
                    الملف الشخصي
                  </Link>
                </DropdownMenuItem>
                {user?.role === 'vendor' && (
                  <DropdownMenuItem asChild>
                    <Link to="/vendor/dashboard" className="cursor-pointer w-full">
                      لوحة تحكم المتجر
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/account/orders" className="cursor-pointer w-full">
                    طلباتي
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/favorites" className="cursor-pointer w-full">
                    المفضلة
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={logout}>
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">تسجيل الدخول</Link>
              </Button>
              <Button asChild>
                <Link to="/register">إنشاء حساب</Link>
              </Button>
            </div>
          )}
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">عربة التسوق</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}