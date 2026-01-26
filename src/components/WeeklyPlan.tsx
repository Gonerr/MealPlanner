import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const WeeklyPlan: React.FC = () => {
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
  );
};

export default WeeklyPlan;