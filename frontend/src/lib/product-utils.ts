/**
 * Generuje slug URL z nazwy produktu
 * Format: {nazwa-produktu}
 * @example generateProductSlug("AMD Ryzen 9 7950X")
 * // returns "amd-ryzen-9-7950x"
 */
export function generateProductSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD") // Normalizacja znaków (ą -> a)
        .replace(/[\u0300-\u036f]/g, "") // Usunięcie akcentów
        .replace(/[^a-z0-9]+/g, "-") // Zamiana nie-alfanumerycznych na myślniki
        .replace(/^-+|-+$/g, "") // Usunięcie myślników na początku/końcu
}

/**
 * Zwraca slug produktu (do użycia jako identyfikator w URL)
 * W tym przypadku slug jest już bezpośrednio użyteczny
 * @example getProductSlug("amd-ryzen-9-7950x")
 * // returns "amd-ryzen-9-7950x"
 */
export function getProductSlug(slug: string): string {
    return slug
}

/**
 * Generuje pełny URL do strony produktu
 * @example getProductUrl("Test Product")
 * // returns "/products/test-product"
 */
export function getProductUrl(name: string): string {
    return `/products/${generateProductSlug(name)}`
}

/**
 * Generuje pełny URL do strony produktu ze slug
 * @example getProductUrlFromSlug("test-product")
 * // returns "/products/test-product"
 */
export function getProductUrlFromSlug(slug: string): string {
    return `/products/${slug}`
}
