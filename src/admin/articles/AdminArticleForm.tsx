import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { NovelEditor } from './NovelEditor';
import { convertToWebP } from '../../lib/imageOptimization';
import { ChevronLeft } from 'lucide-react';

// Registering custom fonts or sizes if needed, but for now we'll use standard ones
// and ensure the toolbar is comprehensive.

export const AdminArticleForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    category: 'Research & Study',
    title: '',
    author: '',
    editor: '',
    date: '',
    read_time: '',
    content: '',
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
            author: data.author,
            editor: data.editor || '',
            date: data.date,
            read_time: data.read_time,
            content: data.content || '',
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
      setSaving(true);
      try {
        // Optimize and convert to WebP
        const webpBlob = await convertToWebP(imageFile);
        const fileName = `${Math.random()}.webp`;
        const filePath = `${fileName}`;
        const webpFile = new File([webpBlob], fileName, { type: 'image/webp' });

        const { error: uploadError } = await supabase.storage
          .from('article-images')
          .upload(filePath, webpFile, {
            contentType: 'image/webp'
          });

        if (uploadError) {
          toast.error(`Gagal mengupload gambar: ${uploadError.message}`);
          setSaving(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('article-images')
          .getPublicUrl(filePath);

        image_url = publicUrlData.publicUrl;
      } catch (err) {
        toast.error('Gagal mengoptimasi gambar');
        setSaving(false);
        return;
      }
    }

    // Generate snippet from content by removing HTML tags
    const plainTextContent = formData.content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    const autoDescription = plainTextContent.length > 200 
      ? plainTextContent.substring(0, 200) + '...' 
      : plainTextContent;

    const payload = {
      ...formData,
      editor: formData.editor.trim() !== '' ? formData.editor : formData.author,
      description: autoDescription,
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
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/admin/articles')}
          className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 hover:text-blue-600 text-gray-600 transition-all focus:outline-none"
          title="Kembali"
        >
          <ChevronLeft size={24} strokeWidth={2} className="ml-[-2px]" />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit Artikel' : 'Tambah Artikel'}</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Kategori *</label>
          <select 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            required
          >
            <option value="Research & Study">Research & Study</option>
            <option value="Sparta Info Terkini">Sparta Info Terkini</option>
            <option value="Announcement">Announcement</option>
            <option value="News">News</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Judul *</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            required 
          />
        </div>



        <div>
          <label className="block text-sm font-medium mb-1">Konten Lengkap Artikel *</label>
          <NovelEditor 
            content={formData.content} 
            onChange={(value: string) => setFormData({...formData, content: value})}
            minHeight="600px"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Penulis *</label>
            <input 
              type="text" 
              value={formData.author} 
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Editor</label>
            <input 
              type="text" 
              value={formData.editor} 
              onChange={(e) => setFormData({...formData, editor: e.target.value})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              placeholder="Opsional"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Diposting *</label>
            <input 
              type="date" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estimasi Waktu Baca *</label>
            <select 
              value={formData.read_time} 
              onChange={(e) => setFormData({...formData, read_time: e.target.value})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required
            >
              <option value="">Pilih waktu baca</option>
              {[...Array(15)].map((_, i) => (
                <option key={i+1} value={`${i+1} min read`}>{i+1} min read</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gambar Banner</label>
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="file" 
                id="banner-upload"
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden"
                required={!isEdit && !previewUrl}
              />
              <div className="flex items-center gap-3">
                <label 
                  htmlFor="banner-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all shadow-sm group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {imageFile ? imageFile.name : (previewUrl ? 'Ganti Banner' : 'Pilih Gambar')}
                  </span>
                </label>

                {(imageFile || previewUrl) && (
                  <button 
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setPreviewUrl('');
                      const input = document.getElementById('banner-upload') as HTMLInputElement;
                      if (input) input.value = '';
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus gambar"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {previewUrl && (
              <div className="relative inline-block group w-full max-w-md">
                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-xl border-2 border-gray-100 shadow-md transition-transform group-hover:scale-[1.01]" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs font-medium px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full">Preview Banner</span>
                </div>
              </div>
            )}
          </div>
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
