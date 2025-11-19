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
 * Generuje pełny URL do strony produktu
 * @example getProductUrl("Test Product")
 * // returns "/products/test-product"
 */
export function getProductUrl(name: string): string {
  return `/products/${generateProductSlug(name)}`
}
