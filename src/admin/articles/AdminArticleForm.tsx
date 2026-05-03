import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';

export const AdminArticleForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    category: 'IKAMMA Insights',
    title: '',
    description: '',
    author: '',
    date: '',
    read_time: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (isEdit) {
      const fetchArticle = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
        if (data) {
          setFormData({
            category: data.category,
            title: data.title,
            description: data.description,
            author: data.author,
            date: data.date,
            read_time: data.read_time,
          });
          setPreviewUrl(data.image_url || '');
        } else if (error) {
          toast.error('Gagal memuat data artikel');
        }
        setLoading(false);
      };
      fetchArticle();
    }
  }, [id, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let image_url = previewUrl;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error(`Gagal mengupload gambar: ${uploadError.message}`);
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      image_url = publicUrlData.publicUrl;
    }

    const payload = {
      ...formData,
      image_url,
    };

    if (isEdit) {
      const { error } = await supabase.from('articles').update(payload).eq('id', id);
      if (error) toast.error('Gagal memperbarui artikel');
      else {
        toast.success('Artikel diperbarui');
        navigate('/admin/articles');
      }
    } else {
      const { error } = await supabase.from('articles').insert([payload]);
      if (error) toast.error('Gagal menyimpan artikel');
      else {
        toast.success('Artikel tersimpan');
        navigate('/admin/articles');
      }
    }
    setSaving(false);
  };

  if (loading) return <div>Memuat data...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Artikel' : 'Tambah Artikel'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Kategori *</label>
          <select 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="IKAMMA Insights">IKAMMA Insights</option>
            <option value="Campus Life">Campus Life</option>
            <option value="Career">Career</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Judul *</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi Singkat * (maks ~300 karakter)</label>
          <textarea 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded h-24"
            maxLength={300}
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Penulis *</label>
            <input 
              type="text" 
              value={formData.author} 
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full p-2 border rounded"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal *</label>
            <input 
              type="date" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border rounded"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estimasi Waktu Baca * (contoh: "5 min read")</label>
          <input 
            type="text" 
            value={formData.read_time} 
            onChange={(e) => setFormData({...formData, read_time: e.target.value})}
            className="w-full p-2 border rounded"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gambar Banner</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required={!isEdit}
          />
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-cover rounded-lg" />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button 
            type="button" 
            onClick={() => navigate('/admin/articles')}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};
