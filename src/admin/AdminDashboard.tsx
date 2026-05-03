import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Calendar, GraduationCap, Plus } from 'lucide-react';
import { Link } from 'react-router';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    events: 0,
    info: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articlesRes, eventsRes, infoRes] = await Promise.all([
          supabase.from('articles').select('id', { count: 'exact', head: true }),
          supabase.from('events').select('id', { count: 'exact', head: true }),
          supabase.from('info_mahasiswa').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          articles: articlesRes.count || 0,
          events: eventsRes.count || 0,
          info: infoRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Artikel',
      count: stats.articles,
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50',
      link: '/admin/articles',
      addLink: '/admin/articles/new',
    },
    {
      title: 'Total Event',
      count: stats.events,
      icon: <Calendar className="w-8 h-8 text-green-500" />,
      color: 'bg-green-50',
      link: '/admin/events',
      addLink: '/admin/events/new',
    },
    {
      title: 'Info Mahasiswa',
      count: stats.info,
      icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
      color: 'bg-purple-50',
      link: '/admin/info-mahasiswa',
      addLink: '/admin/info-mahasiswa/new',
    },
  ];

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Loading stats...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
              <span className="text-3xl font-bold text-gray-900">{card.count}</span>
            </div>
            
            <h3 className="text-gray-600 font-medium mb-4">{card.title}</h3>
            
            <div className="flex items-center gap-3">
              <Link
                to={card.link}
                className="flex-1 text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                Lihat Semua
              </Link>
              <Link
                to={card.addLink}
                className="flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                title="Tambah Baru"
              >
                <Plus size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
