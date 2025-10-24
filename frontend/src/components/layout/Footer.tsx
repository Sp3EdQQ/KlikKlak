import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-900">
                                <span className="text-gray-50">PC</span>
                            </div>
                            <span>TechParts</span>
                        </div>
                        <p className="text-gray-500 mb-4 max-w-sm">
                            Your trusted source for premium computer parts and components. Building dreams, one component at a time.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-100"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-100"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-100"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-100"
                            >
                                <Youtube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="mb-4">Shop</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Best Sellers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Deals
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="mb-4">Support</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Track Order
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition-colors hover:text-gray-900">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h4 className="mb-1">Subscribe to our newsletter</h4>
                            <p className="text-gray-500">
                                Get the latest deals and tech news delivered to your inbox.
                            </p>
                        </div>
                        <div className="flex gap-2 md:min-w-[360px]">
                            <Input type="email" placeholder="Enter your email" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-500">
                    <p>&copy; 2025 TechParts. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
