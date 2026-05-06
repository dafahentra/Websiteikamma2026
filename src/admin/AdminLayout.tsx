import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, FileText, Calendar, GraduationCap, LogOut, Loader2, Phone, Menu, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export const AdminLayout = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!session && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  if (session && location.pathname === '/admin/login') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Artikel', path: '/admin/articles', icon: <FileText size={20} /> },
    { name: 'Agenda Event', path: '/admin/events', icon: <Calendar size={20} /> },
    { name: 'Kontak Event Besar', path: '/admin/event-contacts', icon: <Phone size={20} /> },
    { name: 'Info Mahasiswa', path: '/admin/info-mahasiswa', icon: <GraduationCap size={20} /> },
    { name: 'Pengaturan', path: '/admin/settings', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      {session && (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 font-bold text-xl text-blue-800">
            IKAMMA Admin
          </div>
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Keluar
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header (Only visible on small screens) */}
        {session && (
          <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 focus:outline-none">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="font-bold text-lg text-blue-800">IKAMMA Admin</span>
            </div>
            <button onClick={handleLogout} className="text-red-600"><LogOut size={20}/></button>
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {session && isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Overlay background */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
            
            {/* Sidebar content */}
            <div className="w-64 bg-white h-full shadow-lg relative z-10 flex flex-col">
              <div className="h-16 flex items-center px-6 border-b border-gray-200 font-bold text-xl text-blue-800 justify-between">
                <span>IKAMMA Admin</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = location.pathname.startsWith(link.path);
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
