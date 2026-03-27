'use client';

import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import AdminPanel from '../features/menu/AdminPanel';
import { selectIsAdminMode, selectFilteredDishes, selectMenuStats } from '../features/menu/menuSlice';
import Sidebar from '../components/shared/Sidebar';
import RecipesSection from '../components/RecipesSections';
import Footer from '../components/layout/Footer';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  const isAdminMode = useSelector(selectIsAdminMode);
  const filteredDishes = useSelector(selectFilteredDishes);
  const stats = useSelector(selectMenuStats);

  const router = useRouter();
    
  useEffect(() => {
      // Проверяем авторизацию
      fetch('/api/auth/me')
          .then(async (res) => {
              if (res.ok) {
                  const data = await res.json();
                  setUser(data.user);
              }
          })
          .catch(() => router.push('/login'));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {method: 'POST'});
    setUser(null);
    router.push('/login');
  }

  return (
    <div className="App">
      <Header />

      <main>
        <Container className="px-0" fluid>
          {isAdminMode ? (
            <AdminPanel />
          ) : (
            <>
              {/* Приветственный блок */}
              <div className="position-relative vh-100 d-flex align-items-center justify-content-center overflow-hidden">
                <div
                  className="position-absolute top-0 left-0 w-100 h-100 bg-cover bg-center mr-0 ml-0"
                  style={{
                    backgroundColor: '#83bcddff',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)'
                  }}
                />
                <div className="position-absolute top-0 left-0 w-100 h-100 bg-dark opacity-40" />
                <div className="position-relative z-10 text-center text-white px-4">
                  <h1 className="display-1 fw-light mb-4" style={{
                    letterSpacing: '2px',
                    textShadow: '0 2px 10px rgba(0, 164, 230, 0.3)'
                  }}>
                    Вкусный уголок
                  </h1>
                  <div className="display-6 fw-light mb-5 mx-auto" style={{
                    maxWidth: '800px',
                    lineHeight: '1.6',
                    textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                  }}>
                    Выбирай меню на сегодня, завтра и каждый день
                  </div>
                  <div className="d-flex justify-content-center gap-4 mt-5">
                    <div className="text-center">
                      <div className="display-5 fw-bold">{stats.total}</div>
                      <div className="fs-6 opacity-90">рецептов</div>
                    </div>
                    <div className="vr opacity-25" />
                    <div className="text-center">
                      <div className="display-5 fw-bold">{Math.round(stats.avgPrice)}</div>
                      <div className="fs-6 opacity-90">мин среднее время</div>
                    </div>
                    <div className="vr opacity-25" />
                    <div className="text-center">
                      <div className="display-5 fw-bold">{stats.specials}</div>
                      <div className="fs-6 opacity-90">избранных</div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="d-flex flex-column align-items-center">
                      <span className="fs-6 opacity-75 mb-2">Продолжить просмотр</span>
                      <div className="mouse-scroll">
                        <div className="mouse">
                          <div className="wheel"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Row>
                <Col lg={9} className="mb-4">
                  <RecipesSection />
                </Col>
                <Col lg={3} className="mb-4">
                  <Sidebar />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}

function useEffect(arg0: () => void, arg1: AppRouterInstance[]) {
  throw new Error('Function not implemented.');
}
