import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Contact } from 'lucide-react';
import Tests from './components/Tests/Tests';
import TestsJS from './components/Tests/TestsJS';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* Навигация */}
      <nav>
        <Link to="/">Главная</Link> |{" "}
        <Link to="/tests">Тесты</Link> |{" "}
        <Link to="/contact">Контакты</Link>
      </nav>

      {/* Маршруты */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tests" element={<Tests />}>
          <Route path="js" element={<TestsJS />} />
          {/* <Route path="bike" element={<BikeProducts />} /> */}
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Provider>
    </BrowserRouter>
);

reportWebVitals();
