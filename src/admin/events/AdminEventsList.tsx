import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminEventsList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('type', activeTab)
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error('Gagal memuat event');
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus event ini?')) return;
    
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      toast.error('Gagal menghapus event');
    } else {
      toast.success('Event berhasil dihapus');
      fetchEvents();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Event</h1>
        <Link
          to="/admin/events/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Tambah Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-4 text-center font-medium ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-4 text-center font-medium ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Past Events
          </button>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                  <th className="p-4 font-medium">Gambar</th>
                  <th className="p-4 font-medium">Judul</th>
                  <th className="p-4 font-medium">Lokasi</th>
                  <th className="p-4 font-medium">Tanggal</th>
                  {activeTab === 'upcoming' && <th className="p-4 font-medium">Status</th>}
                  <th className="p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      Belum ada event.
                    </td>
                  </tr>
                ) : (
                  events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        {evt.image_url ? (
                          <img src={evt.image_url} alt={evt.title} className="w-16 h-12 object-cover rounded" />
                        ) : (
                          <div className="w-16 h-12 bg-gray-200 rounded"></div>
                        )}
                      </td>
                      <td className="p-4 font-medium text-gray-900">{evt.title}</td>
                      <td className="p-4 text-sm text-gray-600">{evt.location}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {activeTab === 'upcoming' ? `${evt.event_date} ${evt.month_year}` : evt.full_date}
                      </td>
                      {activeTab === 'upcoming' && (
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${evt.status === 'ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {evt.status}
                          </span>
                        </td>
                      )}
                      <td className="p-4 flex gap-2">
                        <Link to={`/admin/events/edit/${evt.id}`} className="p-2 text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded transition-colors">
                          <Edit size={18} />
                        </Link>
                        <button onClick={() => handleDelete(evt.id)} className="p-2 text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
