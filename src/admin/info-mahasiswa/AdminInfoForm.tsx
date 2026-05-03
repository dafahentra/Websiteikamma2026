import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { NovelEditor } from '../articles/NovelEditor';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let poster_url = previewUrl;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('info-mahasiswa-posters')
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error(`Gagal mengupload poster: ${uploadError.message}`);
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('info-mahasiswa-posters')
        .getPublicUrl(filePath);

      poster_url = publicUrlData.publicUrl;
    }

    const payload = {
      ...formData,
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
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Info Mahasiswa' : 'Tambah Info Mahasiswa'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Kategori *</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value as any})}
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
              type="text" 
              value={formData.posted_date} 
              onChange={(e) => setFormData({...formData, posted_date: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="25 Apr 2026"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Periode Mulai *</label>
            <input 
              type="text" 
              value={formData.period_start} 
              onChange={(e) => setFormData({...formData, period_start: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="1 Mei 2026"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Periode Selesai *</label>
            <input 
              type="text" 
              value={formData.period_end} 
              onChange={(e) => setFormData({...formData, period_end: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="30 Juni 2026"
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
            className="w-full p-2 border rounded"
            placeholder="https://..."
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Poster</label>
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
              <img src={previewUrl} alt="Preview" className="w-48 object-cover rounded-lg border shadow-sm" />
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
