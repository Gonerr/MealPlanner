export interface EmptyStateProps {
  searchQuery?: string;
  activeCategory?: string;
  categories?: Array<{ id: string; name: string }>;
  onResetCategory?: () => void; 
}