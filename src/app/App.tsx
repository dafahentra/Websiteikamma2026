import { Routes, Route, useLocation, Navigate } from 'react-router';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';

// Admin Imports (usually better to keep admin separate or also lazy load)
import { AdminLayout } from '../admin/AdminLayout';
import { AdminLoginPage } from '../admin/AdminLoginPage';
import { AdminDashboard } from '../admin/AdminDashboard';
import { AdminArticlesList } from '../admin/articles/AdminArticlesList';
import { AdminArticleForm } from '../admin/articles/AdminArticleForm';
import { AdminEventsList } from '../admin/events/AdminEventsList';
import { AdminEventForm } from '../admin/events/AdminEventForm';
import { AdminEventContacts } from '../admin/events/AdminEventContacts';
import { AdminInfoList } from '../admin/info-mahasiswa/AdminInfoList';
import { AdminInfoForm } from '../admin/info-mahasiswa/AdminInfoForm';
import { AdminAlumniList } from '../admin/alumni/AdminAlumniList';
import { AdminAlumniForm } from '../admin/alumni/AdminAlumniForm';
import { AdminSettings } from '../admin/AdminSettings';

// Lazy Load Public Pages for better performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const AboutIkamma = lazy(() => import('./pages/AboutIkamma').then(m => ({ default: m.AboutIkamma })));
const DepartmentDetail = lazy(() => import('./pages/DepartmentDetail').then(m => ({ default: m.DepartmentDetail })));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage').then(m => ({ default: m.ArticlesPage })));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage').then(m => ({ default: m.ArticleDetailPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const InfoMahasiswaPage = lazy(() => import('./pages/InfoMahasiswaPage').then(m => ({ default: m.InfoMahasiswaPage })));
const AlumniDatabase = lazy(() => import('./pages/AlumniDatabase').then(m => ({ default: m.AlumniDatabase })));

import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Show preloader ONLY on the home page.
    // For admin or any other sub-pages, we skip the preloader.
    if (location.pathname !== '/') {
      setIsLoading(false);
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && location.pathname === '/' && (
          <Preloader onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutIkamma />} />
          <Route path="/departemen/:slug" element={<DepartmentDetail />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/info-mahasiswa" element={<InfoMahasiswaPage />} />
          <Route path="/alumni-database" element={<AlumniDatabase />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
            
            <Route path="articles" element={<AdminArticlesList />} />
            <Route path="articles/new" element={<AdminArticleForm />} />
            <Route path="articles/edit/:id" element={<AdminArticleForm />} />
            
            <Route path="events" element={<AdminEventsList />} />
            <Route path="events/new" element={<AdminEventForm />} />
            <Route path="events/edit/:id" element={<AdminEventForm />} />
            <Route path="event-contacts" element={<AdminEventContacts />} />
            
            <Route path="info-mahasiswa" element={<AdminInfoList />} />
            <Route path="info-mahasiswa/new" element={<AdminInfoForm />} />
            <Route path="info-mahasiswa/edit/:id" element={<AdminInfoForm />} />

            <Route path="alumni" element={<AdminAlumniList />} />
            <Route path="alumni/new" element={<AdminAlumniForm />} />
            <Route path="alumni/edit/:id" element={<AdminAlumniForm />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
