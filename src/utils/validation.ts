interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  status?: string;
}

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>"'&]/g, '')
    .trim()
    .slice(0, 100);
};

export const validateCategory = (data: CategoryFormData) => {
  const errors: Record<string, string> = {};
  
  if (!data.name || data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
  }
  
  return errors;
};
