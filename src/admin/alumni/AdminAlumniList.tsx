import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminAlumniList = () => {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAlumni = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat data alumni');
    } else {
      setAlumni(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus data alumni ini?')) return;

    const { error } = await supabase.from('alumni').delete().eq('id', id);
    if (error) {
      toast.error('Gagal menghapus data alumni');
    } else {
      toast.success('Data alumni berhasil dihapus');
      fetchAlumni();
    }
  };

  const filteredAlumni = alumni.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-left">Database Alumni</h1>
          <p className="text-gray-500 text-left">Kelola data alumni yang tampil di halaman publik</p>
        </div>
        <Link
          to="/admin/alumni/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Tambah Alumni
        </Link>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Cari nama atau perusahaan..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-medium">Nama</th>
                <th className="p-4 font-medium">Angkatan</th>
                <th className="p-4 font-medium">Perusahaan</th>
                <th className="p-4 font-medium">Posisi</th>
                <th className="p-4 font-medium">Lokasi</th>
                <th className="p-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAlumni.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    {searchTerm ? 'Tidak ada hasil pencarian.' : 'Belum ada data alumni.'}
                  </td>
                </tr>
              ) : (
                filteredAlumni.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.major}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                        {item.batch}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{item.company}</td>
                    <td className="p-4 text-sm text-gray-600">{item.position}</td>
                    <td className="p-4 text-sm text-gray-600">{item.location}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link 
                          to={`/admin/alumni/edit/${item.id}`} 
                          className="p-2 text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="p-2 text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
