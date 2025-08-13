"use client";
import { useToasts } from '@/hooks/use-toast';

export default function ToastViewport() {
  const { toasts, dismiss } = useToasts();
  return (
    <div className="fixed z-50 top-4 right-4 flex flex-col gap-3 w-72">
      {toasts.map(t => (
        <div key={t.id} className={`rounded-lg shadow border p-3 text-sm bg-white flex flex-col gap-1 ${t.type === 'error' ? 'border-red-300' : t.type === 'success' ? 'border-green-300' : 'border-nordic-200'}`}>
          {t.title && <p className="font-semibold text-nordic-800 text-xs uppercase tracking-wide">{t.title}</p>}
          <p className="text-nordic-700 leading-snug">{t.message}</p>
          <button onClick={() => dismiss(t.id)} className="self-end text-xs text-nordic-400 hover:text-nordic-600">Close</button>
        </div>
      ))}
    </div>
  );
}
