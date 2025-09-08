export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  parentId?: string | null;
  isActive: boolean;
  order?: number;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  parentId?: string;
  isActive: boolean;
  order?: number;
}
