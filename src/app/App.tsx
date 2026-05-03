import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { AboutIkamma } from './pages/AboutIkamma';
import { DepartmentDetail } from './pages/DepartmentDetail';
import { ArticlesPage } from './pages/ArticlesPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { InfoMahasiswaPage } from './pages/InfoMahasiswaPage';

// Admin Imports
import { AdminLayout } from '../admin/AdminLayout';
import { AdminLoginPage } from '../admin/AdminLoginPage';
import { AdminDashboard } from '../admin/AdminDashboard';
import { AdminArticlesList } from '../admin/articles/AdminArticlesList';
import { AdminArticleForm } from '../admin/articles/AdminArticleForm';
import { AdminEventsList } from '../admin/events/AdminEventsList';
import { AdminEventForm } from '../admin/events/AdminEventForm';
import { AdminInfoList } from '../admin/info-mahasiswa/AdminInfoList';
import { AdminInfoForm } from '../admin/info-mahasiswa/AdminInfoForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutIkamma />} />
      <Route path="/departemen/:slug" element={<DepartmentDetail />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/info-mahasiswa" element={<InfoMahasiswaPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        
        <Route path="articles" element={<AdminArticlesList />} />
        <Route path="articles/new" element={<AdminArticleForm />} />
        <Route path="articles/edit/:id" element={<AdminArticleForm />} />
        
        <Route path="events" element={<AdminEventsList />} />
        <Route path="events/new" element={<AdminEventForm />} />
        <Route path="events/edit/:id" element={<AdminEventForm />} />
        
        <Route path="info-mahasiswa" element={<AdminInfoList />} />
        <Route path="info-mahasiswa/new" element={<AdminInfoForm />} />
        <Route path="info-mahasiswa/edit/:id" element={<AdminInfoForm />} />
      </Route>
    </Routes>
  );
}
