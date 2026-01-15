import MitIDCallback from '@/components/auth/MitIDCallback';
import { Suspense } from 'react';

export default function MitIDCallbackPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <MitIDCallback />
    </Suspense>
  );
}
