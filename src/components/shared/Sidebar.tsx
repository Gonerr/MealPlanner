// components/Sidebar.tsx
import React from 'react';
import WeeklyPlan from '../WeeklyPlan';
import ShoppingList from '../ShoppingList';

const Sidebar: React.FC = () => {
  return (
    <div style={{ top: '20px' }}>
      
      {/* План на неделю */}
      <div className="card border-0 bg-white mb-4" style={{ 
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.02)',
        overflow: 'hidden'
      }}>
        <div className="card-body p-0">
          <div className="p-4 border-bottom" style={{ 
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <div className="d-flex align-items-center">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <CalendarIcon />
              </div>
              <h5 className="card-title mb-0" style={{ 
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#333'
              }}>
                План на неделю
              </h5>
            </div>
          </div>
          <div className="p-4">
            <WeeklyPlan />
          </div>
        </div>
      </div>

      {/* Список покупок */}
      <ShoppingListCard />

      {/* Быстрые действия */}
      <QuickActionsCard />

      {/* Прогресс недели */}
      <WeekProgress />
    </div>
  );
};

export default Sidebar;

// Вспомогательные компоненты иконок
const CalendarIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#4a90e2" strokeWidth="1.5" fill="none"/>
    <path d="M3 10H21" stroke="#4a90e2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 2V6" stroke="#4a90e2" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 2V6" stroke="#4a90e2" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Компонент списка покупок с кнопками
const ShoppingListCard: React.FC = () => {
  const handlePrint = () => {
    console.log('Печать списка');
    // Логика печати
  };

  const handleSendToPhone = () => {
    console.log('Отправка на телефон');
    // Логика отправки
  };

  return (
    <div className="card border-0 bg-white mb-4" style={{ 
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.02)',
      overflow: 'hidden'
    }}>
      <div className="card-body p-0">
        <div className="p-4 border-bottom" style={{ 
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div className="d-flex align-items-center">
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <ShoppingCartIcon />
            </div>
            <h5 className="card-title mb-0" style={{ 
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#333'
            }}>
              Список покупок
            </h5>
          </div>
        </div>
        
        <div className="p-4">
          <ShoppingList />
          
          <div className="mt-4 pt-3 border-top">
            <button 
              className="btn w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
              onClick={handlePrint}
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontWeight: '500',
                fontSize: '0.95rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#43a047'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
            >
              <PrinterIcon />
              Распечатать список
            </button>
            
            <button 
              className="btn w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={handleSendToPhone}
              style={{
                backgroundColor: 'transparent',
                color: '#4a90e2',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                padding: '12px',
                fontWeight: '500',
                fontSize: '0.95rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
                e.currentTarget.style.borderColor = '#4a90e2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}
            >
              <PhoneIcon />
              Отправить на телефон
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент быстрых действий
const QuickActionsCard: React.FC = () => {
  const actions = [
    { 
      icon: <CubeIcon />, 
      label: 'Случайный рецепт', 
      color: '#2196f3',
      onClick: () => console.log('Случайный рецепт')
    },
    { 
      icon: <StarIcon />, 
      label: 'Избранные рецепты', 
      color: '#ff9800',
      onClick: () => console.log('Избранные рецепты')
    },
    { 
      icon: <ClockIcon />, 
      label: 'Быстрые рецепты', 
      color: '#4caf50',
      onClick: () => console.log('Быстрые рецепты')
    },
  ];

  return (
    <div className="card border-0 bg-white mb-4" style={{ 
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.02)'
    }}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <LightningIcon />
          </div>
          <h6 className="card-title mb-0" style={{ 
            fontSize: '1rem',
            fontWeight: '600',
            color: '#333'
          }}>
            Быстрые действия
          </h6>
        </div>
        
        <div className="d-grid gap-3">
          {actions.map((action, index) => (
            <button 
              key={index}
              className="btn d-flex align-items-center gap-2"
              onClick={action.onClick}
              style={{
                backgroundColor: `rgba(${hexToRgb(action.color)}, 0.08)`,
                color: action.color,
                border: 'none',
                borderRadius: '10px',
                padding: '12px 16px',
                fontWeight: '500',
                fontSize: '0.95rem',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `rgba(${hexToRgb(action.color)}, 0.15)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `rgba(${hexToRgb(action.color)}, 0.08)`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Компонент прогресса недели
const WeekProgress: React.FC = () => {
  const completedDays = 3;
  const totalDays = 7;
  const progress = (completedDays / totalDays) * 100;

  return (
    <div className="p-3 text-center" style={{
      borderRadius: '12px',
      backgroundColor: 'rgba(74, 144, 226, 0.05)',
      fontSize: '0.9rem',
      color: '#666'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span>Недельный прогресс</span>
        <span style={{ fontWeight: '600', color: '#4a90e2' }}>
          {completedDays}/{totalDays} дней
        </span>
      </div>
      <div className="progress" style={{ height: '6px', borderRadius: '3px' }}>
        <div 
          className="progress-bar" 
          style={{ 
            width: `${progress}%`, 
            backgroundColor: '#4a90e2',
            borderRadius: '3px',
            transition: 'width 0.5s ease'
          }}
        ></div>
      </div>
    </div>
  );
};

// Вспомогательная функция для преобразования hex в rgb
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
};

// Иконки SVG (можно вынести в отдельный файл icons.tsx)
const ShoppingCartIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" 
          stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M3 6H21" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PrinterIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 9V2H18V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C20.7893 17.7893 20.5304 18 20 18H18" 
          stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 14H6V22H18V14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" stroke="#4a90e2" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="18" r="1" fill="#4a90e2"/>
  </svg>
);

const LightningIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L4 14H11L11 22L20 10H13L13 2Z" 
          stroke="#ff9800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const CubeIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="#2196f3" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="#2196f3" opacity="0.7"/>
  </svg>
);

const StarIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          stroke="#ff9800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#4caf50" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12L15 15" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);