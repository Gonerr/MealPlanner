'use client';

// Главная страница
import { Container, Row, Col, Alert, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../components/layout/Header';
import AdminPanel from '../features/menu/AdminPanel';
import { selectIsAdminMode, selectFilteredDishes, selectMenuStats } from '../features/menu/menuSlice';
import Sidebar from '../components/shared/Sidebar';
import RecipesSection from '../components/RecipesSections';
import Footer from '../components/layout/Footer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PlanBlock from '@/components/shared/PlanBlock';
import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const isAdminMode = useSelector(selectIsAdminMode);

  const [selectedDay, setSelectedDay] = useState(0);
  const days = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);

      return {
      index: i,
      label: i === 0 ? 'Сегодня' : date.toLocaleDateString('ru-RU', {weekday: 'short'}),
      full: date.toLocaleDateString('ru-RU',{day: 'numeric', month: 'long'})
      };
  });

  const router = useRouter();
    
 // Проверяем авторизацию
  useEffect(() => {
      fetch('/api/auth/me')
          .then(async (res) => {
              if (res.ok) {
                  const data = await res.json();
                  setUser(data.user);
              }
          })
          .catch(() => router.push('/login'));
  }, []);
  
  return (
    <div className="App">
      <Header />

      <main>
        <Container className="px-2">
          {isAdminMode ? (
            <AdminPanel />
          ) : (
            <>
              {/* Левая колонка - сворачиваемый Приветственный блок */}
              <Row>
                <Col lg={3} className='mb-4'>
                  <PlanBlock user={user} days={days}/>

                  <div className='mt-3'>
                    <div className='p-3 bg-light rounded-3' style={{borderRadius: '16px'}}>
                      <small className='text-muted'> Совет дня</small>
                       <p className="mb-0 mt-1" style={{ fontSize: '14px' }}>
                        💡 Не забывайте пить воду и следить за балансом БЖУ!
                      </p>
                    </div>
                  </div>
                </Col>

                {/* Центральная колонка - основной контент (3/5 = 60% ≈ колонка 7 из 12) */}
                <Col lg={7} className='mb-4'>
                    <div className='mb-4'>
                      <div className='d-flex align-items-center justify-content-between mb-3'>
                        <div>
                          <h1 className="h2 fw-bold mb-1">
                              меню на {days[selectedDay].label.toLowerCase()}
                          </h1>
                          <p className="text-muted m-0 small">
                            {days[selectedDay].full}
                          </p>
                        </div>
                        <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill">
                          {days.length} дней
                        </Badge>
                      </div>

                      <div className='d-flex gap-2 overflow-auto pb-2' style={{scrollbarWidth:'thin'}}>
                        {days.map(day => (
                          <button
                              key={day.index}
                              onClick={() => setSelectedDay(day.index)}
                              className={`btn ${
                                  selectedDay === day.index
                                  ? 'btn-dark'
                                  : 'btn-outline-secondary'
                                  }`}
                                  style={{
                                      borderRadius: '20px',
                                      whiteSpace: 'nowrap',
                                      padding: '8px 16px'
                                  }}
                          >
                              <div>{day.label}</div>
                              <small className="opacity-75">{day.full}</small>
                          </button>
                      ))}

                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedDay}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        >
                        <RecipesSection />
                      </motion.div>
                    </AnimatePresence>
                </Col>
                <Col lg={2} className="mb-4">
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
