"use client";
import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '@/lib/api/profile';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useToast } from '@/hooks/useToast';

export default function ProfileDataSection() {
  const { user, updateProfile: updateProfileStore } = useAuthStore();
  const showToast = useToast();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', nickname: '', phone: '', address: '' });

  useEffect(() => {
    setLoading(true);
    getProfile()
      .then((data) => {
        setProfile(data);
        setForm({
          name: data.name || '',
          nickname: data.nickname || '',
          phone: data.phone || '',
          address: data.address || '',
        });
      })
      .catch(() => showToast('No se pudo cargar el perfil', 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updated = await updateProfile(form);
      setProfile(updated);
      updateProfileStore(updated); // Sync with store
      setEditMode(false);
      showToast('Perfil actualizado', 'success');
    } catch {
      showToast('No se pudo actualizar el perfil', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-nordic-600">Cargando perfil...</div>;
  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <div className="mb-2 text-lg font-semibold">Datos personales</div>
          <div className="space-y-2">
            <div>
              <label className="block text-sm text-nordic-700">Nombre completo</label>
              {editMode ? (
                <input name="name" value={form.name} onChange={handleChange} className="input" />
              ) : (
                <div>{profile.name}</div>
              )}
            </div>
            <div>
              <label className="block text-sm text-nordic-700">Usuario</label>
              {editMode ? (
                <input name="nickname" value={form.nickname} onChange={handleChange} className="input" />
              ) : (
                <div>{profile.nickname}</div>
              )}
            </div>
            <div>
              <label className="block text-sm text-nordic-700">Teléfono</label>
              {editMode ? (
                <input name="phone" value={form.phone} onChange={handleChange} className="input" />
              ) : (
                <div>{profile.phone}</div>
              )}
            </div>
            <div>
              <label className="block text-sm text-nordic-700">Dirección</label>
              {editMode ? (
                <input name="address" value={form.address} onChange={handleChange} className="input" />
              ) : (
                <div>{profile.address}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {editMode ? (
            <>
              <button onClick={handleSave} className="btn-primary">Guardar</button>
              <button onClick={() => setEditMode(false)} className="btn-secondary">Cancelar</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="btn-primary">Editar</button>
          )}
        </div>
      </div>
    </div>
  );
}
