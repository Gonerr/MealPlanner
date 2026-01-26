import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Navbar } from 'react-bootstrap';
import { FaUtensils, FaUserLock } from 'react-icons/fa';
import { toggleAdminMode, selectIsAdminMode, selectMenuStats } from '../features/menu/menuSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAdminMode = useSelector(selectIsAdminMode);
  const stats = useSelector(selectMenuStats);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          {(FaUtensils as any)({ className: "me-2" })}
          <span className="fw-bold">Ресторан "Вкусный уголок"</span>
        </Navbar.Brand>
        
        <div className="d-flex align-items-center">
          <div className="text-light me-4 d-none d-md-block">
            <small>
              Блюд: {stats.available}/{stats.total} | 
              Особые: {stats.specials} | 
              Ср. цена: {Math.round(stats.avgPrice)}₽
            </small>
          </div>
          
          <Button
            variant={isAdminMode ? 'warning' : 'outline-light'}
            onClick={() => dispatch(toggleAdminMode())}
            size="sm"
          >
            {(FaUserLock as any)({className: "me-1"})}
            {isAdminMode ? 'Режим администратора' : 'Обычный режим'}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;