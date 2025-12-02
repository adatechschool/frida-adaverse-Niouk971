// Normalise une chaîne : minuscule, espaces remplacés par "-", accents retirés
function normalize(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD") // décompose les accents
        .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
        .replace(/\s+/g, "-"); // remplace espaces par "-"
}

// Génère le slug à partir du type de projet et du nom de promo
export function generateSlug(projectType: string, promoName: string): string {
    return `${normalize(projectType)}-${normalize(promoName)}`;
}
