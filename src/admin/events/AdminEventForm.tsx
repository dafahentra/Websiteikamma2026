import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { NovelEditor } from '../articles/NovelEditor';
import { convertToWebP } from '../../lib/imageOptimization';

export const AdminEventForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'upcoming',
    category: 'Seminar',
    title: '',
    location: '',
    time: '',
    event_date: '',
    month_year: '',
    full_date: '',
    status: 'upcoming',
    location_type: 'offline',
    description: '',
    registration_link: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (isEdit) {
      const fetchEvent = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
        if (data) {
          setFormData({
            type: data.type,
            category: data.category || 'Seminar',
            title: data.title,
            location: data.location,
            time: data.time || '',
            event_date: data.event_date || '',
            month_year: data.month_year || '',
            full_date: data.full_date || '',
            status: data.status || 'upcoming',
            location_type: data.location_type || 'offline',
            description: data.description || '',
            registration_link: data.registration_link || '',
          });
          setPreviewUrl(data.image_url || '');
        } else if (error) {
          toast.error('Gagal memuat data event');
        }
        setLoading(false);
      };
      fetchEvent();
    }
  }, [id, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const formatEventDate = (dateStr: string, endDateStr?: string) => {
    if (!dateStr) return { day: '', monthYear: '', full: '' };
    const start = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    
    const day = start.getDate().toString();
    const monthYear = `${months[start.getMonth()]} ${start.getFullYear().toString().substring(2)}`;
    const full = `${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`;

    if (endDateStr) {
      const end = new Date(endDateStr);
      if (start.getTime() === end.getTime()) {
        return { day, monthYear, full };
      }
      return {
        day: `${day} - ${end.getDate()}`,
        monthYear,
        full: `${months[start.getMonth()]} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
      };
    }

    return { day, monthYear, full };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let image_url = previewUrl;

    if (imageFile) {
      setSaving(true);
      try {
        const webpBlob = await convertToWebP(imageFile);
        const fileName = `${Math.random()}.webp`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(filePath, webpBlob, {
            contentType: 'image/webp'
          });

        if (uploadError) {
          toast.error(`Gagal mengupload gambar: ${uploadError.message}`);
          setSaving(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('event-images')
          .getPublicUrl(filePath);

        image_url = publicUrlData.publicUrl;
      } catch (err) {
        toast.error('Gagal mengoptimasi gambar');
        setSaving(false);
        return;
      }
    }

    const dateInfo = formatEventDate(formData.event_date, (formData as any).event_end_date);

    const payload = {
      ...formData,
      time: formData.type === 'upcoming' ? formData.time : null,
      event_date: dateInfo.day,
      month_year: dateInfo.monthYear,
      full_date: dateInfo.full,
      start_date: formData.event_date,
      end_date: (formData as any).event_end_date || formData.event_date,
      status: formData.type === 'upcoming' ? formData.status : null,
      image_url,
    };

    delete (payload as any).event_end_date;

    if (isEdit) {
      const { error } = await supabase.from('events').update(payload).eq('id', id);
      if (error) toast.error('Gagal memperbarui event');
      else {
        toast.success('Event diperbarui');
        navigate('/admin/events');
      }
    } else {
      const { error } = await supabase.from('events').insert([payload]);
      if (error) toast.error('Gagal menyimpan event');
      else {
        toast.success('Event tersimpan');
        navigate('/admin/events');
      }
    }
    setSaving(false);
  };

  if (loading) return <div>Memuat data...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Event' : 'Tambah Event'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tipe Event *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" checked={formData.type === 'upcoming'} onChange={() => setFormData({...formData, type: 'upcoming'})} />
                Upcoming Event
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" checked={formData.type === 'past'} onChange={() => setFormData({...formData, type: 'past'})} />
                Past Event
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Jenis Event *</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Seminar">Seminar</option>
              <option value="Lomba">Lomba</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
              <option value="Lainnya">Lainnya</option>
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Lokasi *</label>
            <input 
              type="text" 
              value={formData.location} 
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-2 border rounded"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipe Lokasi *</label>
            <div className="flex gap-4 h-10 items-center">
              {['offline', 'online'].map((type) => (
                <label key={type} className="flex items-center gap-2 capitalize">
                  <input 
                    type="radio" 
                    checked={formData.location_type === type} 
                    onChange={() => setFormData({...formData, location_type: type})} 
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi Event *</label>
          <NovelEditor 
            content={formData.description} 
            onChange={(content) => setFormData({...formData, description: content})} 
            minHeight="350px"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Link Pendaftaran (Opsional)</label>
            <input 
              type="url" 
              value={formData.registration_link} 
              onChange={(e) => setFormData({...formData, registration_link: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Waktu * (contoh: "09:00 - 17:00 WIB")</label>
            <input 
              type="text" 
              value={formData.time} 
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full p-2 border rounded"
              required={formData.type === 'upcoming'}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Mulai *</label>
            <input 
              type="date" 
              value={formData.event_date} 
              onChange={(e) => setFormData({...formData, event_date: e.target.value})}
              className="w-full p-2 border rounded"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Selesai (Opsional - Jika Range)</label>
            <input 
              type="date" 
              value={(formData as any).event_end_date || ''} 
              onChange={(e) => setFormData({...formData, event_end_date: e.target.value} as any)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {formData.type === 'upcoming' && (
          <div>
            <label className="block text-sm font-medium mb-1">Status Pendaftaran *</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="upcoming">Segera Hadir</option>
              <option value="ongoing">Sedang Berlangsung</option>
            </select>
          </div>
        )}

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
            onClick={() => navigate('/admin/events')}
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
