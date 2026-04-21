'use client';

// Главная страница
import { Container, Row, Col, Badge, } from 'react-bootstrap';
import RecipesSection from '../components/RecipesSections';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PlanBlock from '@/components/shared/PlanBlock';
import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  // const isAdminMode = useSelector(selectIsAdminMode);

  const [selectedDay, setSelectedDay] = useState(0);
  const days = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      index: i,
      label: i === 0 ? 'Сегодня' :
        i === 1 ? 'Завтра' :
          date.toLocaleDateString('ru-RU', { weekday: 'short' }),
      full: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
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
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'));
  }, []);

  return (
    <div className="App">
        <Container fluid className="px-5 py-4">
          <Row>
            {/* Основной контент (3/5 = 60% ≈ колонка 7 из 12) */}
            <Col lg={9} className='mb-4'>
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

                <div className='d-flex gap-2 overflow-auto pb-2' style={{ scrollbarWidth: 'thin' }}>
                  {days.map(day => (
                    <button
                      key={day.index}
                      onClick={() => setSelectedDay(day.index)}
                      className={`btn ${selectedDay === day.index
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

            <Col lg={3} className='mb-1'>
              <PlanBlock user={user} days={days} />
            </Col>
          </Row>
        </Container>
    </div>
  );
}
