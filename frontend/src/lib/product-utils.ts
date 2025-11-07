/**
 * Generuje slug URL z ID i nazwy produktu
 * np. (1, "AMD Ryzen 9 7950X") -> "1-amd-ryzen-9-7950x"
 */
export function generateProductSlug(id: string | number, name: string): string {
    const nameSlug = name
        .toLowerCase()
        .normalize("NFD") // Normalizacja znaków (ą -> a)
        .replace(/[\u0300-\u036f]/g, "") // Usunięcie akcentów
        .replace(/[^a-z0-9]+/g, "-") // Zamiana nie-alfanumerycznych na myślniki
        .replace(/^-+|-+$/g, "") // Usunięcie myślników na początku/końcu

    return `${id}-${nameSlug}`
}

/**
 * Wyciąga ID produktu ze sluga
 * np. "1-amd-ryzen-9-7950x" -> "1"
 */
export function getProductIdFromSlug(slug: string): string {
    return slug.split("-")[0]
}

/**
 * Generuje pełny URL do strony produktu
 */
export function getProductUrl(id: string | number, name: string): string {
    return `/products/${generateProductSlug(id, name)}`
}
