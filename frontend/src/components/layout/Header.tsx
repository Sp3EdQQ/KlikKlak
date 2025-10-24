import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <a href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-900">
                                <span className="text-gray-50">PC</span>
                            </div>
                            <span className="hidden md:inline-block">TechParts</span>
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="transition-colors hover:text-gray-900">
                            Products
                        </a>
                        <a href="#" className="transition-colors hover:text-gray-900">
                            Deals
                        </a>
                        <a href="#" className="transition-colors hover:text-gray-900">
                            Build Guide
                        </a>
                        <a href="#" className="transition-colors hover:text-gray-900">
                            Support
                        </a>
                    </nav>

                    {/* Search */}
                    <div className="hidden lg:flex flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full pl-10"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] text-gray-50">
                                3
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
