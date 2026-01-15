import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslation } from '@/lib/useTranslation';

// TODO: Replace with actual OAuth logic and handlers
type SocialAuthHandlerProps = {
  provider: 'google' | 'mitid';
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

const SocialAuthHandler = ({ provider, onSuccess, onError }: SocialAuthHandlerProps) => {
  const t = useTranslation();
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
      onSuccess?.({ provider });
    } catch (e: any) {
      setError(t?.common?.error || `Error with ${provider}`);
      onError?.(e);
    } finally {
      setLoading(false);
    }
  };

  const continueWith = t?.login?.orContinueWith || t?.social?.continueWith || 'Continue with';

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleSocialAuth}
        disabled={loading}
        aria-label={`${continueWith} ${provider === 'google' ? 'Google' : 'MitID'}`}
      >
        <Image
          src={provider === 'google' ? '/icons/google.svg' : '/icons/mitid.svg'}
          alt={provider === 'google' ? 'Google' : 'MitID'}
          width={24}
          height={24}
        />
        {loading ? (t?.common?.connecting || 'Connecting...') : `${continueWith} ${provider === 'google' ? 'Google' : 'MitID'}`}
      </Button>
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}

export default SocialAuthHandler;
