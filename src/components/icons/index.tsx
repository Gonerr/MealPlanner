// components/icons/index.tsx
export const CookingPotIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 11V20C19 20.2652 18.8946 20.5196 18.7071 20.7071C18.5196 20.8946 18.2652 21 18 21H6C5.73478 21 5.48043 20.8946 5.29289 20.7071C5.10536 20.5196 5 20.2652 5 20V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11L10 3H14L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 11H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16V16.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const HeartIcon: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StarIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export const ClockIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const UserIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 20C6 17.7909 7.79086 16 10 16H14C16.2091 16 18 17.7909 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const FireIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 14.5C8.5 16.433 10.067 18 12 18C13.933 18 15.5 16.433 15.5 14.5C15.5 12.567 14 11 13 10C12 9 11.5 8.5 11.5 7.5C11.5 7.5 10.5 10 8.5 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const BookOpenIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 5 17.5 5 12.5V5.5C5 4.5 6 3.5 7 3.5C8 3.5 9 4.5 9 5.5V12.5C9 14.5 11 16.5 12 16.5C13 16.5 15 14.5 15 12.5V5.5C15 4.5 16 3.5 17 3.5C18 3.5 19 4.5 19 5.5V12.5C19 17.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AllCategoriesIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const NoRecipesIcon: React.FC = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48" cy="48" r="44" stroke="#E5E7EB" strokeWidth="2"/>
    <path d="M32 40L40 48L32 56" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M64 40L56 48L64 56" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="48" cy="48" r="8" stroke="#9CA3AF" strokeWidth="2"/>
    <path d="M60 36C60 33.7909 61.7909 32 64 32C66.2091 32 68 33.7909 68 36C68 38.2091 66.2091 40 64 40" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
    <path d="M36 60C36 57.7909 34.2091 56 32 56C29.7909 56 28 57.7909 28 60C28 62.2091 29.7909 64 32 64" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const CheckIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Иконки категорий
export const SunriseIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 18C17 16.6739 16.4732 15.4021 15.5355 14.4645C14.5979 13.5268 13.3261 13 12 13C10.6739 13 9.40215 13.5268 8.46447 14.4645C7.52678 15.4021 7 16.6739 7 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 9V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.22 10.22L5.64 11.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 18H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 18H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.36 11.64L19.78 10.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LeafIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 2C9.33333 4.66667 8 8 8 12C8 16 9.33333 19.3333 12 22C14.6667 19.3333 16 16 16 12C16 8 14.6667 4.66667 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// SVG иконки (можно вынести в отдельный файл)
export const ChefHatIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C8.68629 15 6 17.6863 6 21H18C18 17.6863 15.3137 15 12 15Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 15V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const SortAscIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SortDescIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const InfoIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const SaladIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
          stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 8L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 8L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 2C9.33333 4.66667 8 8 8 12C8 16 9.33333 19.3333 12 22C14.6667 19.3333 16 16 16 12C16 8 14.6667 4.66667 12 2Z" 
          stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const SoupIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 5 17.5 5 12.5V5.5C5 4.5 6 3.5 7 3.5C8 3.5 9 4.5 9 5.5V12.5C9 14.5 11 16.5 12 16.5C13 16.5 15 14.5 15 12.5V5.5C15 4.5 16 3.5 17 3.5C18 3.5 19 4.5 19 5.5V12.5C19 17.5 12 21 12 21Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="1" fill="currentColor"/>
    <path d="M12 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MainDishIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 11L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 14L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="9" r="1" fill="currentColor"/>
  </svg>
);

export const DessertIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 15 5 15 8C15 11 12 14 12 14C12 14 9 11 9 8C9 5 12 2 12 2Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 22H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="19" r="1" fill="currentColor"/>
    <circle cx="10" cy="5" r="0.5" fill="currentColor"/>
    <circle cx="14" cy="5" r="0.5" fill="currentColor"/>
  </svg>
);

export const SnackIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="8" y="4" width="8" height="2" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="10" y="2" width="4" height="2" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <circle cx="9" cy="9" r="0.5" fill="currentColor"/>
    <circle cx="15" cy="15" r="0.5" fill="currentColor"/>
  </svg>
);

export const DrinkIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 6H20V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V6Z" 
          stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 10H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 14H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);


export const FoodIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
          stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const AllIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);


export const XIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// Для сайдбара (если нужно)
export const CalendarIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.7"/>
    <rect x="12" y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.7"/>
    <rect x="7" y="16" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.7"/>
  </svg>
);

export const ShoppingCartIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const LightningIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L4 14H11L11 22L20 10H13L13 2Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const SettingsIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M19.4 15C19.2663 15.3068 19.1334 15.6135 19 15.92C19.56 16.48 20 17.08 20 17.78C20 18.48 19.56 19.08 19 19.58C18.4186 20.0946 17.7461 20.5 17 20.8C16.2708 20.5 15.5828 20.0946 15 19.58C14.44 19.08 14 18.48 14 17.78C14 17.08 14.44 16.48 15 15.92C14.8666 15.6135 14.7337 15.3068 14.6 15C14.2337 15.3068 13.8666 15.6135 13.5 15.92C12.94 16.48 12.5 17.08 12.5 17.78C12.5 18.48 12.94 19.08 13.5 19.58C12.9186 20.0946 12.2461 20.5 11.5 20.8C10.7708 20.5 10.0828 20.0946 9.5 19.58C8.94 19.08 8.5 18.48 8.5 17.78C8.5 17.08 8.94 16.48 9.5 15.92C9.13337 15.6135 8.76632 15.3068 8.4 15C8.03368 14.6932 7.66663 14.3865 7.3 14.08C6.74 13.52 6.3 12.92 6.3 12.22C6.3 11.52 6.74 10.92 7.3 10.42C7.66663 10.1135 8.03368 9.80679 8.4 9.5C8.76632 9.19321 9.13337 8.88655 9.5 8.58C10.06 8.02 10.5 7.42 10.5 6.72C10.5 6.02 10.06 5.42 9.5 4.92C10.0814 4.40535 10.7539 4 11.5 3.7C12.2461 4 12.9186 4.40535 13.5 4.92C14.06 5.42 14.5 6.02 14.5 6.72C14.5 7.42 14.06 8.02 13.5 8.58C13.8666 8.88655 14.2337 9.19321 14.6 9.5C14.9663 9.80679 15.3334 10.1135 15.7 10.42C16.26 10.92 16.7 11.52 16.7 12.22C16.7 12.92 16.26 13.52 15.7 14.08C15.3334 14.3865 14.9663 14.6932 14.6 15Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);


export const FilterIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
  </svg>
);

export const SortIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Альтернативные варианты

export const FilterIconAlt: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SortIconAlt: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6L12 2L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 18L12 22L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Более минималистичные варианты

export const FilterSimpleIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 21V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 10V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 21V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 21V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 12V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="20" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const SortSimpleIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8L12 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 16L12 20L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Для режимов отображения (если нужно)

export const GridViewIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const ListViewIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="4" cy="6" r="1" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="4" cy="12" r="1" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="4" cy="18" r="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Иконка поиска (если понадобится)

export const SearchIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Иконка настроек/настроек фильтра

export const SettingsGearIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" 
          stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Иконка закрытия/очистки фильтра

export const CloseIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

