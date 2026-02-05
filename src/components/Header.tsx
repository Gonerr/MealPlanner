import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Button, Badge } from 'react-bootstrap';
import { FaUserLock, FaUtensils } from 'react-icons/fa';
import { toggleAdminMode, selectIsAdminMode, selectMenuStats } from '../features/menu/menuSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAdminMode = useSelector(selectIsAdminMode);
  const stats = useSelector(selectMenuStats);

  return (
    <Navbar
      bg="white"
      variant="light"
      className="border-bottom border-gray-300 shadow-sm py-2"
      style={{
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        minHeight: '6rem',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <Container fluid className="px-5">

        {/* Левая часть - логотип/название */}
        <Navbar.Brand className="d-flex align-items-center me-0">
          <span className="fw-semibold fs-2 text-dark">Minimal Menu</span>
        </Navbar.Brand>

        {/* Центральная часть - статистика
        <div className="position-absolute start-50 translate-middle-x d-none d-md-flex align-items-center">
          <div className="d-flex align-items-center" style={{ fontSize: '1.1rem' }}>
            <div className="d-flex align-items-center me-4" style={{ fontSize: '1.2rem' }}>
              <span className="fw-medium me-2" >Блюд:</span>
              <Badge bg="light" text="dark" className="fw-normal px-3 py-2 align-self-center" style={{ fontSize: '1.2rem' }}>
                {stats.available}/{stats.total}
              </Badge>
            </div>

            <div className="vr mx-4" style={{ height: '24px', opacity: 0.5 }}></div>

            <div className="d-flex align-items-center me-4" style={{ fontSize: '1.2rem' }}>
              <span className="me-2" >Особые:</span>
              <Badge bg="light" text="dark" className="fw-medium px-3 py-2 align-self-center" style={{ fontSize: '1.2rem' }}>
                {stats.specials}
              </Badge>
            </div>

            <div className="vr mx-4" style={{ height: '24px', opacity: 0.5 }}></div>

            <div className="d-flex align-items-center" style={{ fontSize: '1.2rem' }}>
              <span className="me-2" >Ср. цена:</span>
              <Badge bg="light" text="dark" className="fw-medium px-3 py-2 align-self-center" style={{ fontSize: '1.2rem' }}>
                {Math.round(stats.avgPrice)}₽
              </Badge>
            </div>
          </div>
        </div> */}

        {/* Правая часть - кнопка переключения режима */}
        <div className="ms-auto">
          <Button
            variant={isAdminMode ? "warning" : "outline-dark"}
            onClick={() => dispatch(toggleAdminMode())}
            size="lg"
            className="d-flex align-items-center"
            style={{
              borderRadius: '6px',
              borderWidth: '1px',
              transition: 'all 0.2s',
              fontWeight: 500
            }}
          >
            {isAdminMode ? 'Админ режим' : 'Обычный режим'}
          </Button>
        </div>

      </Container>
    </Navbar>
  );
};

export default Header;