/**
 * Utility functions for generating and handling URL slugs
 */

/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace Arabic characters with their transliterated equivalents
    .replace(/[أإآا]/g, 'a')
    .replace(/[ة]/g, 'h')
    .replace(/[ي]/g, 'y')
    .replace(/[و]/g, 'w')
    .replace(/[ر]/g, 'r')
    .replace(/[ت]/g, 't')
    .replace(/[ط]/g, 't')
    .replace(/[ظ]/g, 'z')
    .replace(/[ع]/g, 'a')
    .replace(/[غ]/g, 'gh')
    .replace(/[ف]/g, 'f')
    .replace(/[ق]/g, 'q')
    .replace(/[ث]/g, 'th')
    .replace(/[ص]/g, 's')
    .replace(/[ض]/g, 'd')
    .replace(/[ج]/g, 'j')
    .replace(/[ح]/g, 'h')
    .replace(/[خ]/g, 'kh')
    .replace(/[د]/g, 'd')
    .replace(/[ذ]/g, 'th')
    .replace(/[ز]/g, 'z')
    .replace(/[س]/g, 's')
    .replace(/[ش]/g, 'sh')
    .replace(/[ك]/g, 'k')
    .replace(/[ل]/g, 'l')
    .replace(/[م]/g, 'm')
    .replace(/[ن]/g, 'n')
    .replace(/[ه]/g, 'h')
    .replace(/[ء]/g, '')
    // Remove special characters and replace spaces with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Generate a service slug from title and ID
 * @param title - The service title
 * @param id - The service ID (fallback)
 * @returns A URL-friendly slug with ID suffix
 */
export function generateServiceSlug(title: string, id: string): string {
  const titleSlug = generateSlug(title)
  // Ensure we have a valid slug, fallback to service-{id} if title produces empty slug
  const baseSlug = titleSlug || `service-${id}`
  return `${baseSlug}-${id}`
}

/**
 * Extract service ID from a slug
 * @param slug - The service slug
 * @returns The service ID or null if not found
 */
export function extractServiceIdFromSlug(slug: string): string | null {
  // Extract ID from the end of the slug (after the last hyphen)
  const parts = slug.split('-')
  const lastPart = parts[parts.length - 1]
  
  // Check if the last part looks like a valid ID (alphanumeric)
  if (/^[a-zA-Z0-9]+$/.test(lastPart)) {
    return lastPart
  }
  
  return null
}

/**
 * Check if a string is a valid service slug (contains ID at the end)
 * @param slug - The string to check
 * @returns True if it's a valid service slug
 */
export function isValidServiceSlug(slug: string): boolean {
  return extractServiceIdFromSlug(slug) !== null
}

/**
 * Convert legacy service ID to slug format
 * @param id - The service ID
 * @param title - The service title (optional)
 * @returns A slug format string
 */
export function convertIdToSlug(id: string, title?: string): string {
  if (title) {
    return generateServiceSlug(title, id)
  }
  return `service-${id}`
}