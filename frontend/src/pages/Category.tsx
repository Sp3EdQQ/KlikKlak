import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header, Footer } from '@/components/layout';
import { ProductCard } from '@/components/ProductCard';
import { apiService } from '@/services/api.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SlidersHorizontal, Grid3x3, LayoutGrid } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    imageUrl: string | null;
    categoryId: string | null;
}

interface Category {
    id: string;
    name: string;
    description: string | null;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';

export default function Category() {
    const { id } = useParams<{ id: string }>();
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(true);
    const [gridView, setGridView] = useState<'3' | '4'>('4');

    // Filters
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [searchTerm, setSearchTerm] = useState('');
    const [inStock, setInStock] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('name-asc');

    useEffect(() => {
        if (id) {
            fetchCategoryData();
        }
    }, [id]);

    useEffect(() => {
        applyFilters();
    }, [products, priceRange, searchTerm, inStock, sortBy]);

    const fetchCategoryData = async () => {
        try {
            setLoading(true);
            const [categoryData, productsData] = await Promise.all([
                apiService.getCategory(id!),
                apiService.getProducts(),
            ]);

            setCategory(categoryData);
            const categoryProducts = productsData.filter(p => p.categoryId === id);
            setProducts(categoryProducts);

            // Calculate max price
            if (categoryProducts.length > 0) {
                const max = Math.max(...categoryProducts.map(p => parseFloat(p.price)));
                setMaxPrice(Math.ceil(max));
                setPriceRange([0, Math.ceil(max)]);
            }
        } catch (error) {
            console.error('Błąd pobierania danych kategorii:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Price filter
        filtered = filtered.filter(p => {
            const price = parseFloat(p.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Stock filter
        if (inStock) {
            filtered = filtered.filter(p => p.stock > 0);
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price-asc':
                    return parseFloat(a.price) - parseFloat(b.price);
                case 'price-desc':
                    return parseFloat(b.price) - parseFloat(a.price);
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    };

    const resetFilters = () => {
        setPriceRange([0, maxPrice]);
        setSearchTerm('');
        setInStock(false);
        setSortBy('name-asc');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-gray-600">Ładowanie produktów...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Kategoria nie została znaleziona</h1>
                        <Button className="mt-4" asChild>
                            <a href="/">Wróć do strony głównej</a>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-6">
                    {/* Breadcrumb */}
                    <nav className="text-sm text-gray-600 mb-4">
                        <a href="/" className="hover:text-blue-600">Strona główna</a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">{category.name}</span>
                    </nav>

                    {/* Category Header */}
                    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
                        {category.description && (
                            <p className="text-gray-600">{category.description}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                            Znaleziono {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : 'produktów'}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        {/* Filters Sidebar */}
                        <aside
                            className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}
                        >
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">Filtry</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={resetFilters}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Wyczyść
                                    </Button>
                                </div>

                                <div className="space-y-6">
                                    {/* Search */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Szukaj w kategorii
                                        </label>
                                        <Input
                                            placeholder="Nazwa produktu..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Cena
                                        </label>
                                        <Slider
                                            min={0}
                                            max={maxPrice}
                                            step={10}
                                            value={priceRange}
                                            onValueChange={(value) => setPriceRange(value as [number, number])}
                                            className="mb-3"
                                        />
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>{priceRange[0]} zł</span>
                                            <span>{priceRange[1]} zł</span>
                                        </div>
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Dostępność
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="in-stock"
                                                checked={inStock}
                                                onCheckedChange={(checked) => setInStock(checked as boolean)}
                                            />
                                            <label
                                                htmlFor="in-stock"
                                                className="text-sm text-gray-700 cursor-pointer"
                                            >
                                                Tylko dostępne
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                                <div className="flex items-center justify-between gap-4 flex-wrap">
                                    <Button
                                        variant="outline"
                                        className="lg:hidden"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                                        {showFilters ? 'Ukryj filtry' : 'Pokaż filtry'}
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Sortuj:</span>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="name-asc">Nazwa A-Z</option>
                                            <option value="name-desc">Nazwa Z-A</option>
                                            <option value="price-asc">Cena rosnąco</option>
                                            <option value="price-desc">Cena malejąco</option>
                                        </select>
                                    </div>

                                    <div className="hidden md:flex items-center gap-2">
                                        <Button
                                            variant={gridView === '3' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setGridView('3')}
                                        >
                                            <Grid3x3 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={gridView === '4' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setGridView('4')}
                                        >
                                            <LayoutGrid className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            {filteredProducts.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                    <p className="text-gray-600 text-lg">
                                        Nie znaleziono produktów spełniających kryteria
                                    </p>
                                    <Button
                                        className="mt-4"
                                        onClick={resetFilters}
                                    >
                                        Wyczyść filtry
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    className={`grid gap-4 ${
                                        gridView === '4'
                                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                    }`}
                                >
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={parseFloat(product.price)}
                                            imageUrl={product.imageUrl || '/placeholder-product.jpg'}
                                            rating={4.5}
                                            reviewCount={Math.floor(Math.random() * 100)}
                                            inStock={product.stock > 0}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
