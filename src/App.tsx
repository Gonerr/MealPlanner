import React from 'react';
import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import MenuList from './features/menu/MenuList';
import AdminPanel from './features/menu/AdminPanel';
import SearchBar from './components/shared/SearchBar';
import WeeklyPlan from './components/WeeklyPlan';
import ShoppingList from './components/ShoppingList';
import { selectIsAdminMode, selectFilteredDishes, selectMenuStats } from './features/menu/menuSlice';

function App() {
  const isAdminMode = useSelector(selectIsAdminMode);
  const filteredDishes = useSelector(selectFilteredDishes);
  const stats = useSelector(selectMenuStats);

  return (
    <div className="App">
      <Header />
      
      <main className="py-4">
        <Container fluid={isAdminMode}>
          {isAdminMode ? (
            // Режим администратора - редактирование базы рецептов
            <AdminPanel />
          ) : (
            // Пользовательский режим - планирование домашней готовки
            <>
              {/* Приветственный блок */}
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary mb-3">
                  🏠 Меню домашней кухни
                </h1>
                <p className="lead text-muted mb-4">
                  Выбирайте рецепты, составляйте меню на неделю и получайте список покупок
                </p>
                
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Badge bg="success" className="fs-6 p-3">
                    📋 {stats.total} рецептов в базе
                  </Badge>
                  <Badge bg="info" className="fs-6 p-3">
                    ⏱️ Среднее время: {Math.round(stats.avgPrice)} мин
                  </Badge>
                  <Badge bg="warning" className="fs-6 p-3">
                    ⭐ {stats.specials} избранных рецептов
                  </Badge>
                </div>
              </div>

              <Row>
                {/* Левая колонка - фильтры и поиск */}
                <Col lg={3} className="mb-4">
                  <div className="sticky-top" style={{ top: '20px' }}>
                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        <h5 className="card-title mb-4">
                          🔍 Поиск и фильтры
                        </h5>
                        
                        <div className="mb-4">
                          <SearchBar />
                        </div>
                        
                        <div className="mb-4">
                          <h6 className="mb-3">🍽️ Категории блюд</h6>
                          <CategoryFilter />
                        </div>
                        
                        <div className="mb-3">
                          <h6 className="mb-3">📊 Статистика</h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Найдено:</span>
                            <Badge bg="primary">{filteredDishes.length}</Badge>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Доступно:</span>
                            <Badge bg="success">{stats.available}</Badge>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Избранное:</span>
                            <Badge bg="warning">{stats.specials}</Badge>
                          </div>
                        </div>
                        
                        <Alert variant="info" className="small mt-4">
                          <strong>💡 Совет:</strong> Выбирайте рецепты и добавляйте их в план на неделю
                        </Alert>
                      </div>
                    </div>
                    
                    {/* Блок с подсказками */}
                    <div className="card shadow-sm border-0 mt-3">
                      <div className="card-body">
                        <h6 className="card-title mb-3">📝 Быстрые советы</h6>
                        <ul className="list-unstyled small">
                          <li className="mb-2">✅ Двойной клик по рецепту для редактирования</li>
                          <li className="mb-2">⭐ Отмечайте любимые рецепты</li>
                          <li className="mb-2">📅 Добавляйте в план на неделю</li>
                          <li>🛒 Автоматический список покупок</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Центральная колонка - список рецептов */}
                <Col lg={6} className="mb-4">
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="card-title mb-0">
                          {filteredDishes.length > 0 ? '🍳 Доступные рецепты' : '😔 Рецепты не найдены'}
                        </h2>
                        <Badge bg={filteredDishes.length > 0 ? "success" : "warning"} pill>
                          {filteredDishes.length}
                        </Badge>
                      </div>
                      
                      {filteredDishes.length > 0 ? (
                        <MenuList />
                      ) : (
                        <Alert variant="light" className="text-center py-5">
                          <div className="display-1 mb-3">🍳</div>
                          <h4>Рецепты не найдены</h4>
                          <p className="text-muted">
                            Попробуйте изменить фильтры или поисковый запрос.<br />
                            Или добавьте новые рецепты в режиме администратора.
                          </p>
                        </Alert>
                      )}
                    </div>
                  </div>
                </Col>

                {/* Правая колонка - план на неделю и список покупок */}
                <Col lg={3} className="mb-4">
                  <div className="sticky-top" style={{ top: '20px' }}>
                    {/* План на неделю */}
                    <div className="card shadow-sm border-0 mb-4">
                      <div className="card-body">
                        <h5 className="card-title mb-3">
                          📅 План на неделю
                        </h5>
                        <WeeklyPlan />
                      </div>
                    </div>
                    
                    {/* Список покупок */}
                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        <h5 className="card-title mb-3">
                          🛒 Список покупок
                        </h5>
                        <ShoppingList />
                        
                        <div className="mt-4">
                          <button className="btn btn-success w-100 mb-2">
                            📝 Распечатать список
                          </button>
                          <button className="btn btn-outline-primary w-100">
                            📱 Отправить на телефон
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Быстрое меню */}
                    <div className="card shadow-sm border-0 mt-4">
                      <div className="card-body">
                        <h6 className="card-title mb-3">⚡ Быстрые действия</h6>
                        <div className="d-grid gap-2">
                          <button className="btn btn-outline-info">
                            🎲 Случайный рецепт
                          </button>
                          <button className="btn btn-outline-warning">
                            ⭐ Избранные рецепты
                          </button>
                          <button className="btn btn-outline-success">
                            🕒 Быстрые рецепты
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </main>

      {/* Футер */}
      <footer className="bg-light py-4 mt-5 border-top">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
              <h5 className="text-primary">🏠 Домашняя кухня</h5>
              <p className="text-muted small mb-0">
                Планируйте меню, готовьте с удовольствием!
              </p>
            </Col>
            
            <Col md={4} className="text-center mb-3 mb-md-0">
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="text-decoration-none text-secondary">
                  👤 Личный кабинет
                </a>
                <a href="#" className="text-decoration-none text-secondary">
                  📚 База рецептов
                </a>
                <a href="#" className="text-decoration-none text-secondary">
                  💬 Сообщество
                </a>
              </div>
            </Col>
            
            <Col md={4} className="text-center text-md-end">
              <small className="text-muted">
                С любовью для домашних поваров ❤️<br />
                © {new Date().getFullYear()} ДомашняяКухня.ру
              </small>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;