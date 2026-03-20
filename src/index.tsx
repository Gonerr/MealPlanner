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
import Github from './components/Tests/Github';
import Nextjs from './components/Tests/NextJS';
import Objects from './components/Tests/Objects';

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
          <Route path="TestsJS" element={<TestsJS />} />
          <Route path="Github" element = {<Github/>} />
          <Route path="Nextjs" element = {<Nextjs/>} />
          <Route path="Objects" element = {<Objects/>} />
          {/* <Route path="bike" element={<BikeProducts />} /> */}
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Provider>
    </BrowserRouter>
);

reportWebVitals();
