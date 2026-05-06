import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminArticlesList = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat artikel');
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      toast.error('Gagal menghapus artikel');
    } else {
      toast.success('Artikel berhasil dihapus');
      fetchArticles();
    }
  };

  if (loading) return <div>Memuat...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Artikel</h1>
        <Link
          to="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Tambah Artikel
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-medium">Gambar</th>
                <th className="p-4 font-medium">Judul</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Penulis</th>
                <th className="p-4 font-medium">Tanggal</th>
                <th className="p-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    Belum ada artikel.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      {article.image_url ? (
                        <img src={article.image_url} alt={article.title} className="w-16 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded"></div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-900">{article.title}</td>
                    <td className="p-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{article.category}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{article.author}</td>
                    <td className="p-4 text-sm text-gray-600">{article.date}</td>
                    <td className="p-4 flex gap-2">
                      <Link to={`/admin/articles/edit/${article.id}`} className="p-2 text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(article.id)} className="p-2 text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={18} />
                      </button>
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
