import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { NovelEditor } from '../articles/NovelEditor';
import { convertToWebP } from '../../lib/imageOptimization';
import { ChevronLeft } from 'lucide-react';

export const AdminInfoForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    category: 'Magang',
    title: '',
    organizer: '',
    description: '',
    full_description: '',
    posted_date: '',
    period_start: '',
    period_end: '',
    status: 'open',
    link: '',
    work_type: 'offline', // New field: hybrid/online/offline
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (isEdit) {
      const fetchInfo = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('info_mahasiswa').select('*').eq('id', id).single();
        if (data) {
          setFormData({
            category: data.category,
            title: data.title,
            organizer: data.organizer,
            description: data.description,
            full_description: data.full_description,
            posted_date: data.posted_date,
            period_start: data.period_start,
            period_end: data.period_end,
            status: data.status,
            link: data.link,
            work_type: data.work_type || 'offline',
          });
          setPreviewUrl(data.poster_url || '');
        } else if (error) {
          toast.error('Gagal memuat data info mahasiswa');
        }
        setLoading(false);
      };
      fetchInfo();
    }
  }, [id, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return '';
    if (dateStr.includes('-') && dateStr.split('-').length === 3) return dateStr;
    const parts = dateStr.split(' ');
    if (parts.length !== 3) return '';
    const day = parts[0].padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = (months.indexOf(parts[1]) + 1).toString().padStart(2, '0');
    return `${parts[2]}-${month}-${day}`;
  };

  const formatDateForStorage = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let poster_url = previewUrl;

    if (imageFile) {
      setSaving(true);
      try {
        const webpBlob = await convertToWebP(imageFile);
        const fileName = `${Math.random()}.webp`;
        const filePath = `${fileName}`;
        const webpFile = new File([webpBlob], fileName, { type: 'image/webp' });

        const { error: uploadError } = await supabase.storage
          .from('info-mahasiswa-posters')
          .upload(filePath, webpFile, {
            contentType: 'image/webp'
          });

        if (uploadError) {
          toast.error(`Gagal mengupload poster: ${uploadError.message}`);
          setSaving(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('info-mahasiswa-posters')
          .getPublicUrl(filePath);

        poster_url = publicUrlData.publicUrl;
      } catch (err) {
        toast.error('Gagal mengoptimasi gambar');
        setSaving(false);
        return;
      }
    }

    const payload = {
      ...formData,
      posted_date: formatDateForStorage(formData.posted_date),
      period_start: formatDateForStorage(formData.period_start),
      period_end: formatDateForStorage(formData.period_end),
      deadline_date: formData.period_end, // Save raw date for auto-status
      poster_url,
    };

    if (isEdit) {
      const { error } = await supabase.from('info_mahasiswa').update(payload).eq('id', id);
      if (error) toast.error('Gagal memperbarui info');
      else {
        toast.success('Info diperbarui');
        navigate('/admin/info-mahasiswa');
      }
    } else {
      const { error } = await supabase.from('info_mahasiswa').insert([payload]);
      if (error) toast.error('Gagal menyimpan info');
      else {
        toast.success('Info tersimpan');
        navigate('/admin/info-mahasiswa');
      }
    }
    setSaving(false);
  };

  if (loading) return <div>Memuat data...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/admin/info-mahasiswa')}
          className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 hover:text-blue-600 text-gray-600 transition-all focus:outline-none"
          title="Kembali"
        >
          <ChevronLeft size={24} strokeWidth={2} className="ml-[-2px]" />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit Info Mahasiswa' : 'Tambah Info Mahasiswa'}</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Kategori *</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value as any})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required
            >
              <option value="Magang">Magang</option>
              <option value="Lomba">Lomba</option>
              <option value="Beasiswa">Beasiswa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
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
        
        {formData.category === 'Magang' && (
          <div>
            <label className="block text-sm font-medium mb-1">Tipe Kerja (Khusus Magang) *</label>
            <div className="flex gap-4 mb-4">
              {['offline', 'online', 'hybrid'].map((type) => (
                <label key={type} className="flex items-center gap-2 capitalize">
                  <input 
                    type="radio" 
                    checked={formData.work_type === type} 
                    onChange={() => setFormData({...formData, work_type: type})} 
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Penyelenggara * (contoh: "Bank Indonesia")</label>
          <input 
            type="text" 
            value={formData.organizer} 
            onChange={(e) => setFormData({...formData, organizer: e.target.value})}
            className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi Singkat * (Muncul di Card)</label>
          <NovelEditor 
            content={formData.description} 
            onChange={(content) => setFormData({...formData, description: content})} 
            minHeight="150px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi Lengkap * (Muncul di Modal)</label>
          <NovelEditor 
            content={formData.full_description} 
            onChange={(content) => setFormData({...formData, full_description: content})} 
            minHeight="400px"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Diposting *</label>
            <input 
              type="date" 
              value={formatDateForInput(formData.posted_date)} 
              onChange={(e) => setFormData({...formData, posted_date: e.target.value})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Periode Mulai *</label>
            <input 
              type="date" 
              value={formatDateForInput(formData.period_start)} 
              onChange={(e) => setFormData({...formData, period_start: e.target.value})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Periode Selesai *</label>
            <input 
              type="date" 
              value={formatDateForInput(formData.period_end)} 
              onChange={(e) => setFormData({...formData, period_end: e.target.value})}
              className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Link Pendaftaran *</label>
          <input 
            type="url" 
            value={formData.link} 
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            placeholder="https://..."
            required 
          />
        </div>

          <label className="block text-sm font-medium mb-2">Poster</label>
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="file" 
                id="poster-upload"
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden"
                required={!isEdit && !previewUrl}
              />
              <div className="flex items-center gap-3">
                <label 
                  htmlFor="poster-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all shadow-sm group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {imageFile ? imageFile.name : (previewUrl ? 'Ganti Poster' : 'Pilih Gambar')}
                  </span>
                </label>

                {(imageFile || previewUrl) && (
                  <button 
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setPreviewUrl('');
                      const input = document.getElementById('poster-upload') as HTMLInputElement;
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
              <div className="relative inline-block group">
                <img src={previewUrl} alt="Preview" className="w-48 aspect-[3/4] object-cover rounded-xl border-2 border-gray-100 shadow-md transition-transform group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
                  <span className="text-white text-xs font-medium px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full">Preview</span>
                </div>
              </div>
            )}
          </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button 
            type="button" 
            onClick={() => navigate('/admin/info-mahasiswa')}
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
