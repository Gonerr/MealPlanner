import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import AdminPanel from './features/menu/AdminPanel';
import { selectIsAdminMode, selectFilteredDishes, selectMenuStats } from './features/menu/menuSlice';
import Sidebar from './components/shared/Sidebar';
import RecipesSection from './components/RecipesSections';

import Footer from './components/layout/Footer';

function App() {
  const isAdminMode = useSelector(selectIsAdminMode);
  const filteredDishes = useSelector(selectFilteredDishes);
  const stats = useSelector(selectMenuStats);


  return (
    <div className="App">
      <Header />

      <main>
        <Container className="px-0" fluid>
          {isAdminMode ? (
            // Режим администратора - редактирование базы рецептов
            <AdminPanel />
          ) : (
            // Пользовательский режим - планирование домашней готовки
            <>
              {/* Приветственный блок */}
              <div className="position-relative vh-100 d-flex align-items-center justify-content-center overflow-hidden">
                <div
                  className="position-absolute top-0 left-0 w-100 h-100 bg-cover bg-center mr-0 ml-0"
                  style={{
                    // backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
                    backgroundColor: '#83bcddff',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)'
                  }}
                />

                {/* Затемнение фона */}
                <div className="position-absolute top-0 left-0 w-100 h-100 bg-dark opacity-40" />

                {/* Контент */}
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

                  {/* Статистика */}
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

                  {/* Кнопка прокрутки */}
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
                {/* Левая колонка - фильтры и поиск
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
                {/* <div className="card shadow-sm border-0 mt-3">
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
                </Col> */}

                {/* Центральная колонка - список рецептов */}
                <Col lg={9} className="mb-4">
                  <RecipesSection />
                </Col>

                {/* Правая колонка - план на неделю и список покупок */}
                <Col lg={3} className="mb-4">
                  <Sidebar />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </main>

      {/* Футер */}
      <Footer/>
    </div>  
  );
}

export default App;