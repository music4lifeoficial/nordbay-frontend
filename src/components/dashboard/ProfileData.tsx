import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ProfileData() {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar_url: user?.avatar_url || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      avatar_url: user?.avatar_url || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  }, [user]);

  if (!user) return <div className="text-nordic-500">Cargando perfil...</div>;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      toast.success('Perfil actualizado');
      setEdit(false);
    } catch (err: any) {
      toast.error(err?.message || 'Error al actualizar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-nordic-900 p-6 rounded-xl shadow-md animate-fade-in">
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-nordic-200">
          {form.avatar_url ? (
            <Image src={form.avatar_url} alt="avatar" fill className="object-cover" />
          ) : (
            <span className="w-full h-full flex items-center justify-center text-3xl text-nordic-400">👤</span>
          )}
        </div>
        <div className="text-lg font-bold text-nordic-900 dark:text-white">{user.name || user.email}</div>
        <div className="text-xs text-nordic-500">{user.email}</div>
        <div className="text-xs text-nordic-500">
          Niveau: {user.mitid_verified ? 'MitID Verificeret' : user.verified ? 'Email verificeret' : 'Public'}
          {user.mitid_verified && <span className="ml-2 text-brand-600">✔️</span>}
          {!user.mitid_verified && user.verified && <span className="ml-2 text-brand-400">✉️</span>}
        </div>
      </div>
      {!edit ? (
        <>
          <div className="space-y-2 mb-4">
            <div><span className="font-medium">Nombre:</span> {user.name || <span className="text-nordic-400">No definido</span>}</div>
            <div><span className="font-medium">Teléfono:</span> {user.phone || <span className="text-nordic-400">No definido</span>}</div>
            <div><span className="font-medium">Dirección:</span> {user.address || <span className="text-nordic-400">No definido</span>}</div>
          </div>
          <Button onClick={() => setEdit(true)} className="w-full mt-2">Editar perfil</Button>
        </>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Tu teléfono" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <Input name="address" value={form.address} onChange={handleChange} placeholder="Tu dirección" />
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => setEdit(false)} disabled={saving}>Cancelar</Button>
            <Button type="submit" disabled={saving || isLoading}>{saving ? 'Guardando...' : 'Guardar cambios'}</Button>
          </div>
        </form>
      )}
    </div>
  );
}
