import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminEventContacts = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    description: '',
    instagram: '',
    email: '',
    whatsapp: ''
  });

  const fetchContacts = async () => {
    setLoading(true);
    const { data } = await supabase.from('event_contacts').select('*').order('id', { ascending: true });
    if (data) setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async () => {
    if (!newContact.name) return toast.error('Nama event harus diisi');
    const { error } = await supabase.from('event_contacts').insert([newContact]);
    if (error) toast.error('Gagal menambah kontak');
    else {
      toast.success('Kontak ditambahkan');
      setIsAdding(false);
      setNewContact({ name: '', description: '', instagram: '', email: '', whatsapp: '' });
      fetchContacts();
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Hapus kontak ini?')) return;
    const { error } = await supabase.from('event_contacts').delete().eq('id', id);
    if (error) toast.error('Gagal menghapus');
    else {
      toast.success('Berhasil dihapus');
      fetchContacts();
    }
  };

  const handleUpdate = async (id: number, field: string, value: string) => {
    const { error } = await supabase.from('event_contacts').update({ [field]: value }).eq('id', id);
    if (error) toast.error('Gagal update');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Kontak Event</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Tambah Kontak
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Tambah Kontak</h3>
            <button onClick={() => setIsAdding(false)}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Nama Event (Contoh: IDEAS 2026)"
              className="p-2 border rounded"
              value={newContact.name}
              onChange={e => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              placeholder="Deskripsi Singkat"
              className="p-2 border rounded"
              value={newContact.description}
              onChange={e => setNewContact({ ...newContact, description: e.target.value })}
            />
            <input
              placeholder="Instagram (@...)"
              className="p-2 border rounded"
              value={newContact.instagram}
              onChange={e => setNewContact({ ...newContact, instagram: e.target.value })}
            />
            <input
              placeholder="Email"
              className="p-2 border rounded"
              value={newContact.email}
              onChange={e => setNewContact({ ...newContact, email: e.target.value })}
            />
            <input
              placeholder="WhatsApp (+62...)"
              className="p-2 border rounded"
              value={newContact.whatsapp}
              onChange={e => setNewContact({ ...newContact, whatsapp: e.target.value })}
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold"
          >
            Simpan Kontak
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Nama Event</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Kontak</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {contacts.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">Belum ada data.</td></tr>
            ) : (
              contacts.map(c => (
                <tr key={c.id}>
                  <td className="p-4">
                    <input
                      defaultValue={c.name}
                      onBlur={e => handleUpdate(c.id, 'name', e.target.value)}
                      className="w-full bg-transparent focus:bg-white p-1 border-transparent focus:border-gray-200 border rounded"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      defaultValue={c.description}
                      onBlur={e => handleUpdate(c.id, 'description', e.target.value)}
                      className="w-full bg-transparent focus:bg-white p-1 border-transparent focus:border-gray-200 border rounded"
                    />
                  </td>
                  <td className="p-4 space-y-2">
                    <div className="flex gap-2 text-xs">
                      <span className="w-16 font-bold">IG:</span>
                      <input
                        defaultValue={c.instagram}
                        onBlur={e => handleUpdate(c.id, 'instagram', e.target.value)}
                        className="flex-1 bg-transparent border-b border-gray-100"
                      />
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="w-16 font-bold">Email:</span>
                      <input
                        defaultValue={c.email}
                        onBlur={e => handleUpdate(c.id, 'email', e.target.value)}
                        className="flex-1 bg-transparent border-b border-gray-100"
                      />
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="w-16 font-bold">WA:</span>
                      <input
                        defaultValue={c.whatsapp}
                        onBlur={e => handleUpdate(c.id, 'whatsapp', e.target.value)}
                        className="flex-1 bg-transparent border-b border-gray-100"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
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
  );
};
