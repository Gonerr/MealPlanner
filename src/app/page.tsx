'use client';

import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../components/layout/Header';
import AdminPanel from '../features/menu/AdminPanel';
import { selectIsAdminMode, selectFilteredDishes, selectMenuStats } from '../features/menu/menuSlice';
import Sidebar from '../components/shared/Sidebar';
import RecipesSection from '../components/RecipesSections';
import Footer from '../components/layout/Footer';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  const isAdminMode = useSelector(selectIsAdminMode);
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


  return (
    <div className="App">
      <Header />

      <main>
        <Container className="px-2">
          {isAdminMode ? (
            <AdminPanel />
          ) : (
            <>
              {/* Приветственный блок */}
              <div className="px-4 py-4">
                  <h1 className="h2 fw-bold mb-1">
                      меню на {days[selectedDay].label.toLowerCase()}
                  </h1>
                  <p className="text-muted m-0">
                      Подборка блюд на день
                  </p>
              </div>

              <div className="py-4 border-bottom">
                  <div className="d-flex gap-2 overflow-auto px-3">

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
                                      whiteSpace: 'nowrap'
                                  }}
                          >
                              <div>{day.label}</div>
                              <small className="opacity-75">{day.full}</small>
                          </button>
                      ))}

                  </div>
              </div>
              
              <Row>
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  >
                  <RecipesSection />
                </motion.div>
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
