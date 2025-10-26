import { useState } from 'react';
import { ShoppingCart, User, Search, Menu, Heart, Package, ChevronDown, Cpu, Monitor, HardDrive, Keyboard, Mouse, Headphones, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/assets/svgs';

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const categories = [
        { name: 'Procesory', icon: Cpu, href: '/category/cpu' },
        { name: 'Monitory', icon: Monitor, href: '/category/monitors' },
        { name: 'Dyski', icon: HardDrive, href: '/category/storage' },
        { name: 'Klawiatury', icon: Keyboard, href: '/category/keyboards' },
        { name: 'Myszki', icon: Mouse, href: '/category/mice' },
        { name: 'Słuchawki', icon: Headphones, href: '/category/headphones' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
            {/* Top info bar */}
            <div className="bg-blue-500 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex h-9 items-center justify-center text-sm font-medium">
                        <span>KlikKlak - Projekt Inżynierski</span>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex h-20 items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                            <a href="/" className="flex items-center gap-2 shrink-0">
                                <Logo className='h-12 w-12 aspect-square' />
                                <div className="hidden md:block">
                                    <h1 className="text-xl font-bold text-gray-900">KlikKlak</h1>
                                    <p className="text-xs text-gray-500">Twój sklep komputerowy</p>
                                </div>
                            </a>
                        </div>

                        {/* Search - Desktop */}
                        <div className="hidden lg:flex flex-1 max-w-2xl">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Szukaj produktów, kategorii..."
                                    className="w-full pl-12 pr-4 h-12 text-base border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <Button
                                    size="sm"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-500"
                                >
                                    Szukaj
                                </Button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Search Mobile */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            >
                                <Search className="h-5 w-5" />
                            </Button>

                            {/* Wishlist */}
                            <Button variant="ghost" size="icon" className="hidden md:flex relative" title="Lista życzeń">
                                <Heart className="h-5 w-5" />
                                <Badge
                                    variant="default"
                                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full text-[10px]"
                                >
                                    5
                                </Badge>
                            </Button>

                            {/* Account */}
                            <Button variant="ghost" className="hidden md:flex gap-2" title="Konto użytkownika">
                                <User className="h-5 w-5" />
                                <div className="hidden xl:flex flex-col items-start">
                                    <span className="text-xs text-gray-500">Moje konto</span>
                                    <span className="text-sm font-medium">Zaloguj się</span>
                                </div>
                            </Button>

                            {/* Cart */}
                            <Button variant="default" className="relative gap-2 h-11 bg-blue-500">
                                <ShoppingCart className="h-5 w-5" />
                                <div className="hidden sm:flex flex-col items-start">
                                    <span className="text-xs">Koszyk</span>
                                    <span className="text-sm font-bold">1,299 zł</span>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="absolute -top-2 -right-2 h-6 min-w-6 px-1.5 rounded-full bg-red-500 text-white border-2 border-white"
                                >
                                    3
                                </Badge>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            {isSearchOpen && (
                <div className="lg:hidden border-b border-gray-200 bg-white p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Szukaj produktów..."
                            className="w-full pl-10 pr-10"
                            autoFocus
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={() => setIsSearchOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Categories Navigation */}
            <div className="hidden lg:block border-b border-gray-200 bg-gray-50">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-1 h-12">
                        <Button variant="ghost" className="gap-2 font-semibold">
                            Wszystkie kategorie
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                        {categories.map((category) => (
                            <a
                                key={category.name}
                                href={category.href}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                            >
                                <category.icon className="h-4 w-4" />
                                {category.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-b border-gray-200 bg-white">
                    <nav className="container mx-auto px-4 py-4">
                        <div className="space-y-1">
                            {categories.map((category) => (
                                <a
                                    key={category.name}
                                    href={category.href}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                                >
                                    <category.icon className="h-5 w-5" />
                                    {category.name}
                                </a>
                            ))}
                            <div className="border-t border-gray-200 my-2 pt-2">
                                <a href="/account" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                    <User className="h-5 w-5" />
                                    Moje konto
                                </a>
                                <a href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                    <Heart className="h-5 w-5" />
                                    Lista życzeń
                                </a>
                                <a href="/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                    <Package className="h-5 w-5" />
                                    Moje zamówienia
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
