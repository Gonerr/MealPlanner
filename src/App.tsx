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
import Sidebar from './components/shared/Sidebar';
import RecipesSection from './components/RecipesSections';
import styled from 'styled-components';

function App() {
  const isAdminMode = useSelector(selectIsAdminMode);
  const filteredDishes = useSelector(selectFilteredDishes);
  const stats = useSelector(selectMenuStats);

  const NavLinks = styled.div`
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap'
  `;

  const NavLink = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    TextDecotarion: 'none',
    fontSize: '0.95rem',
    padding:'0.5rem 0',
    borderBottom: '1px solid transparent'
  }

  return (
    <div className="App">
      <Header />

      <main>
        <Container className="mw-1600" fluid={isAdminMode}>
          {isAdminMode ? (
            // Режим администратора - редактирование базы рецептов
            <AdminPanel />
          ) : (
            // Пользовательский режим - планирование домашней готовки
            <>
              {/* Приветственный блок */}
              <div className="position-relative vh-100 d-flex align-items-center justify-content-center overflow-hidden">
                {/* Фоновое изображение */}
                <div
                  className="position-absolute top-0 left-0 w-100 h-100 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.4)'
                  }}
                />

                {/* Затемнение фона */}
                <div className="position-absolute top-0 left-0 w-100 h-100 bg-dark opacity-40" />

                {/* Контент */}
                <div className="position-relative z-10 text-center text-white px-4">
                  <h1 className="display-1 fw-light mb-4" style={{
                    letterSpacing: '2px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    Вкусный уголок
                  </h1>

                  <div className="display-6 fw-light mb-5 mx-auto" style={{
                    maxWidth: '800px',
                    lineHeight: '1.6',
                    textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                  }}>
                    Выбирайте меню на сегодня, завтра и всегда
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
      <footer style={{ 
        backgroundColor: '#fafafa',
        padding: '3rem 0 2rem',
        marginTop: '4rem',
        borderTop: '1px solid #eaeaea'
      }}>
        <Container>
          <Row style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            rowGap: '2rem'
          }}>
            <Col lg={4} md={6} style={{
              display:'flex',
              flexDirection:'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <svg viewBox="0 0 16 16" fill="currentColor"
                  style={{
                    width:'24px', 
                    height:'24px', 
                    color:'#4A76A7', 
                    opacity:0.8,
                    transition:'opacity 0.2s'}}>
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                  <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-6Z"/>
                </svg>
                <h5 style={{
                  fontSize:'1.1rem',
                  fontWeight:500,
                  color:'#2c3e50',
                  margin:0,
                  letterSpacing:'-0.3px'
                }}>
                  Домашняя кухня
                </h5> 
              </div>
              <p style={{
                color:'#94a3b8',
                fontSize:'0.9rem',
                lineHeight:1.5,
                margin:0,
                maxWidth: '250px'
              }}>
                Планируйте меню, готовьте с удовольствием
              </p>
            </Col>

            <Col lg={4} mg={12} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <NavLinks>
                    <a href='#' style={NavLink}>
                      <svg className="nav-icon" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      </svg>
                      <span>Личный кабинет</span>
                    </a>

                    <a href='#' style={NavLink}>
                      {/* Иконка книги */}
                      <svg className="nav-icon" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1 2.828c.885-.37 2.154-.769 4-.828 1.843-.06 3.11.336 4 .828v9.996C8.474 11.468 6.927 10.996 5 11c-1.927.004-3.464.535-4 .996V2.828zM11 2c1.941.06 3.202.458 4 .828v9.996c-.536-.46-2.073-.992-4-.996-1.846.004-3.115.458-4 .996V2.828c.88-.492 2.2-.88 4-.828z"/>
                      </svg>
                      <span>База рецептов</span>
                    </a>

                    <a href='#' style={NavLink}>
                      {/* Иконка сообщества/люди */}
                      <svg className="nav-icon" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216Z"/>
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                      </svg>
                      <span>Сообщество</span>
                    </a>
                  </NavLinks>
            </Col>

            <Col lg={4} mg={6} style={{
              display:'flex',
              flexDirection:'column',
              gap:'1rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.5rem'
              }}>
                <svg style={{
                  width: '18px',
                  height: '18px',
                  color: '#e74c3c',
                  opacity: 0.8,
                  marginRight: '0.25rem',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }} viewBox="0 0 16 16" fill="currentColor">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748Z"/>
                </svg>
                <span style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>С любовью для домашних поваров</span>
                <div style={{color:'#94a3b8', fontSize:'0.85rem'}}>
                  @ {new Date().getFullYear()} ДомашняяКухня.ру
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;