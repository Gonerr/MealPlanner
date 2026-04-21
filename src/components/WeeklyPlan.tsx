import { AnimatePresence, motion } from 'framer-motion';
import { CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';

const WeeklyPlan: React.FC = () => {
  const [welcomeCollapsed, setWelcomeCollapsed] = useState(false);

  const days = [
    { day: 'Понедельник', meal: 'Паста карбонара', time: '30 мин' },
    { day: 'Вторник', meal: 'Курица терияки', time: '25 мин' },
    { day: 'Среда', meal: 'Овощное рагу', time: '40 мин' },
    { day: 'Четверг', meal: 'Лосось на гриле', time: '20 мин' },
    { day: 'Пятница', meal: 'Пицца домашняя', time: '45 мин' },
    { day: 'Суббота', meal: 'Плов', time: '60 мин' },
    { day: 'Воскресенье', meal: 'Суп-пюре', time: '35 мин' },
  ];

  return (
    <AnimatePresence mode="wait">
      {!welcomeCollapsed ? (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, height: 'auto' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="card border-0 bg-white mb-4" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.02)',
            overflow: 'hidden'
          }}
            onClick={() => setWelcomeCollapsed(true)}>
            <div className="card-body p-0">
              <div className="p-4 border-bottom" style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className='d-flex align-items-center'>
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

                  <Button
                    variant='link'
                    className="text-black p-0"
                    style={{ textDecoration: 'none', fontSize: '20px' }}
                  >
                    <ChevronUp size={20} />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Текущая неделя</span>
                    <Badge bg="info">7 блюд</Badge>
                  </div>

                  <ListGroup variant="flush">
                    {days.map((item, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-3">
                        <div>
                          <strong>{item.day}</strong>
                          <div className="small text-muted">{item.meal}</div>
                        </div>
                        <Badge bg="light" text="dark">{item.time}</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="mt-3">
                    <button className="btn btn-outline-primary btn-sm w-100">
                      + Добавить в план
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="collapsed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="card border-0 bg-white mb-4" style={{
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.02)',
            overflow: 'hidden'
          }}
            onClick={() => setWelcomeCollapsed(false)}
          >
            <div className="card-body p-0">
              <div className="p-4 border-bottom" style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <div className="d-flex align-items-center justify-content-between">
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
                  <div style={{ fontSize: '20px' }}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>



  );
};

export default WeeklyPlan;