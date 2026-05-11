import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminAlumniForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    major: 'Manajemen',
    company: '',
    position: '',
    location: '',
    linkedin: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isEdit) {
      fetchAlumni();
    }
  }, [id]);

  const fetchAlumni = async () => {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast.error('Gagal mengambil data alumni');
      navigate('/admin/alumni');
    } else {
      setFormData({
        name: data.name || '',
        batch: data.batch || '',
        major: data.major || 'Manajemen',
        company: data.company || '',
        position: data.position || '',
        location: data.location || '',
        linkedin: data.linkedin || '',
        email: data.email || '',
        phone: data.phone || '',
      });
    }
    setInitialLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (isEdit) {
      const { error: updateError } = await supabase
        .from('alumni')
        .update(payload)
        .eq('id', id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('alumni')
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      toast.error(isEdit ? 'Gagal memperbarui data' : 'Gagal menambah data');
      console.error(error);
    } else {
      toast.success(isEdit ? 'Data berhasil diperbarui' : 'Data berhasil ditambah');
      navigate('/admin/alumni');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (initialLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin/alumni')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Kembali
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 text-left">
            {isEdit ? 'Edit Data Alumni' : 'Tambah Alumni Baru'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Nama Lengkap *</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Aditya Pratama"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Angkatan */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Angkatan *</label>
              <input
                required
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                placeholder="Contoh: 2018"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Jurusan */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Jurusan *</label>
              <select
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="Manajemen">Manajemen</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Ilmu Ekonomi">Ilmu Ekonomi</option>
              </select>
            </div>

            {/* Perusahaan */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Perusahaan *</label>
              <input
                required
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Contoh: Google Indonesia"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Posisi */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Posisi *</label>
              <input
                required
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Contoh: Product Manager"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Lokasi */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Lokasi *</label>
              <input
                required
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Contoh: Jakarta"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">LinkedIn URL</label>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alumni@example.com"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Nomor HP */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-semibold text-gray-700">Nomor HP</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 08123456789"
                className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {isEdit ? 'Simpan Perubahan' : 'Tambah Alumni'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
