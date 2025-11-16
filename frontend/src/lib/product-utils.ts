/**
 * Generuje slug URL z ID i nazwy produktu
 * Format: {uuid}--{nazwa-produktu}
 * np. ("ffeb0263-1234-5678-9abc-def012345678", "AMD Ryzen 9 7950X") -> "ffeb0263-1234-5678-9abc-def012345678--amd-ryzen-9-7950x"
 */
export function generateProductSlug(id: string | number, name: string): string {
    const nameSlug = name
        .toLowerCase()
        .normalize("NFD") // Normalizacja znaków (ą -> a)
        .replace(/[\u0300-\u036f]/g, "") // Usunięcie akcentów
        .replace(/[^a-z0-9]+/g, "-") // Zamiana nie-alfanumerycznych na myślniki
        .replace(/^-+|-+$/g, "") // Usunięcie myślników na początku/końcu

    // Używamy podwójnego myślnika jako separatora między UUID a nazwą
    return `${id}--${nameSlug}`
}

/**
 * Wyciąga ID produktu ze sluga
 * np. "ffeb0263-1234-5678-9abc-def012345678--amd-ryzen-9-7950x" -> "ffeb0263-1234-5678-9abc-def012345678"
 */
export function getProductIdFromSlug(slug: string): string {
    // Separator to podwójny myślnik, więc dzielimy po "--" i bierzemy pierwszą część (UUID)
    return slug.split("--")[0]
}

/**
 * Generuje pełny URL do strony produktu
 */
export function getProductUrl(id: string | number, name: string): string {
    return `/products/${generateProductSlug(id, name)}`
}
