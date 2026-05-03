import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    instagram_url: '',
    linkedin_url: '',
    youtube_url: '',
    tiktok_url: '',
    x_url: '',
    company_profile_video_url: '',
    email_contact: '',
    phone_contact: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (data) {
        setSettings({
          instagram_url: data.instagram_url || '',
          linkedin_url: data.linkedin_url || '',
          youtube_url: data.youtube_url || '',
          tiktok_url: data.tiktok_url || '',
          x_url: data.x_url || '',
          company_profile_video_url: data.company_profile_video_url || '',
          email_contact: data.email_contact || '',
          phone_contact: data.phone_contact || '',
        });
      } else if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows returned'
        toast.error('Gagal memuat pengaturan');
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() });

    if (error) {
      toast.error('Gagal menyimpan pengaturan: ' + error.message);
    } else {
      toast.success('Pengaturan disimpan');
    }
    setSaving(false);
  };

  if (loading) return <div>Memuat pengaturan...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">Pengaturan Global</h1>
      <p className="text-gray-500 mb-8">Kelola link sosial media dan informasi kontak utama yang muncul di seluruh website.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Social Media Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Link Sosial Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Instagram URL</label>
              <input 
                type="url" 
                value={settings.instagram_url} 
                onChange={(e) => setSettings({...settings, instagram_url: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input 
                type="url" 
                value={settings.linkedin_url} 
                onChange={(e) => setSettings({...settings, linkedin_url: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">YouTube URL</label>
              <input 
                type="url" 
                value={settings.youtube_url} 
                onChange={(e) => setSettings({...settings, youtube_url: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">TikTok URL</label>
              <input 
                type="url" 
                value={settings.tiktok_url} 
                onChange={(e) => setSettings({...settings, tiktok_url: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://tiktok.com/@..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">X (Twitter) URL</label>
              <input 
                type="url" 
                value={settings.x_url} 
                onChange={(e) => setSettings({...settings, x_url: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="https://x.com/..."
              />
            </div>
          </div>
        </div>

        {/* Company Profile Video */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Video Company Profile</h2>
          <div>
            <label className="block text-sm font-medium mb-1">YouTube Video URL</label>
            <input 
              type="url" 
              value={settings.company_profile_video_url} 
              onChange={(e) => setSettings({...settings, company_profile_video_url: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-400 mt-1">Link ini akan digunakan pada tombol "Click to See Full Video" di homepage dan about page.</p>
          </div>
        </div>

        {/* Main Contacts */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Kontak Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email Utama</label>
              <input 
                type="email" 
                value={settings.email_contact} 
                onChange={(e) => setSettings({...settings, email_contact: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nomor WhatsApp Utama</label>
              <input 
                type="text" 
                value={settings.phone_contact} 
                onChange={(e) => setSettings({...settings, phone_contact: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="+62..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
          >
            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </div>
      </form>
    </div>
  );
};
