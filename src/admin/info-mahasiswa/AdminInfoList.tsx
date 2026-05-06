import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminInfoList = () => {
  const [infoItems, setInfoItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'Semua' | 'Magang' | 'Lomba' | 'Beasiswa'>('Semua');

  const fetchInfo = async () => {
    setLoading(true);
    let query = supabase
      .from('info_mahasiswa')
      .select('id, title, category, posted_date, description, full_description, poster_url, period_start, period_end, status, link, organizer, work_type')
      .order('created_at', { ascending: false });

    if (activeTab !== 'Semua') {
      query = query.eq('category', activeTab);
    }

    const { data, error } = await query;

    if (error) {
      toast.error('Gagal memuat info mahasiswa');
    } else {
      setInfoItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, [activeTab]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus info ini?')) return;

    const { error } = await supabase.from('info_mahasiswa').delete().eq('id', id);
    if (error) {
      toast.error('Gagal menghapus info');
    } else {
      toast.success('Info berhasil dihapus');
      fetchInfo();
    }
  };

  const tabs: ('Semua' | 'Magang' | 'Lomba' | 'Beasiswa')[] = ['Semua', 'Magang', 'Lomba', 'Beasiswa'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Info Mahasiswa </h1>
        <Link
          to="/admin/info-mahasiswa/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Tambah Info
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[100px] py-4 text-center font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                  <th className="p-4 font-medium">Poster</th>
                  <th className="p-4 font-medium">Judul</th>
                  <th className="p-4 font-medium">Kategori</th>
                  <th className="p-4 font-medium">Penyelenggara</th>
                  <th className="p-4 font-medium">Periode</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {infoItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">
                      Belum ada info mahasiswa.
                    </td>
                  </tr>
                ) : (
                  infoItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        {item.poster_url ? (
                          <img src={item.poster_url} alt={item.title} className="w-12 h-16 object-cover rounded" />
                        ) : (
                          <div className="w-12 h-16 bg-gray-200 rounded"></div>
                        )}
                      </td>
                      <td className="p-4 font-medium text-gray-900">{item.title}</td>
                      <td className="p-4 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">{item.category}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{item.organizer}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {item.period_start === item.period_end ? item.period_start : `${item.period_start} - ${item.period_end}`}
                      </td>
                      <td className="p-4 text-sm">
                        {(() => {
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);

                          // Helper to parse "2 Mei 2026" format
                          const parseIKAMMADate = (str: string) => {
                            if (!str) return null;
                            const parts = str.split(' ');
                            if (parts.length !== 3) return null;
                            const day = parseInt(parts[0]);
                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                            const month = months.indexOf(parts[1]);
                            const year = parseInt(parts[2]);
                            if (month === -1) return null;
                            return new Date(year, month, day);
                          };

                          const deadline = (item as any).deadline_date ? new Date((item as any).deadline_date) : parseIKAMMADate(item.period_end);
                          if (deadline) deadline.setHours(0, 0, 0, 0);

                          const isPast = deadline && now > deadline;
                          const displayStatus = isPast ? 'closed' : item.status;

                          return (
                            <span className={`px-2 py-1 rounded text-xs ${displayStatus === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {displayStatus.toUpperCase()}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="p-4 flex gap-2">
                        <Link to={`/admin/info-mahasiswa/edit/${item.id}`} className="p-2 text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded transition-colors">
                          <Edit size={18} />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded transition-colors">
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
