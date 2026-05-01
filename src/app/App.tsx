import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { AboutIkamma } from './pages/AboutIkamma';
import { DepartmentDetail } from './pages/DepartmentDetail';
import { ArticlesPage } from './pages/ArticlesPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutIkamma />} />
      <Route path="/departemen/:slug" element={<DepartmentDetail />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
