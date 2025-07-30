import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// TODO: Replace with actual OAuth logic and handlers
type SocialAuthHandlerProps = {
  provider: 'google' | 'mitid';
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

const SocialAuthHandler = ({ provider, onSuccess, onError }: SocialAuthHandlerProps) => {
  // Placeholder for loading and error state
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSocialAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual OAuth redirect/flow
      // Simulate async
      await new Promise((res) => setTimeout(res, 1200));
      if (onSuccess) onSuccess({ provider });
    } catch (e: any) {
      setError('Error al conectar con ' + provider);
      if (onError) onError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleSocialAuth}
        disabled={loading}
        aria-label={`Continuar con ${provider === 'google' ? 'Google' : 'MitID'}`}
      >
        <Image
          src={provider === 'google' ? '/icons/google.svg' : '/icons/mitid.svg'}
          alt={provider === 'google' ? 'Google' : 'MitID'}
          width={24}
          height={24}
        />
        {loading ? 'Conectando...' : `Continuar con ${provider === 'google' ? 'Google' : 'MitID'}`}
      </Button>
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}

export default SocialAuthHandler;
