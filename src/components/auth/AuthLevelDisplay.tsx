'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '@/types/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface AuthLevelDisplayProps {
  user: User | null;
  showUpgrade?: boolean;
  className?: string;
}

export function AuthLevelDisplay({ user, showUpgrade = true, className }: AuthLevelDisplayProps) {
  if (!user) {
    return null;
  }

  const isMitID = user.mitid_verified;
  const isVerified = user.verified;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isMitID ? 'MitID Verified' : isVerified ? 'Email Verified' : 'Unverified'}
          </CardTitle>
          <Badge className={isMitID ? 'bg-green-600' : isVerified ? 'bg-blue-600' : 'bg-gray-500'}>
            {isMitID ? 'MitID Verified' : isVerified ? 'Email Verified' : 'Unverified'}
          </Badge>
        </div>
        <CardDescription>
          {isMitID
            ? 'Din konto er verificeret med MitID.'
            : isVerified
            ? 'Din email er bekræftet.'
            : 'Din konto er ikke verificeret.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Verification Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {user.verified ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-orange-500" />
            )}
            <span className="text-sm">
              Email {user.verified ? 'bekræftet' : 'ikke bekræftet'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {user.mitid_verified ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-orange-500" />
            )}
            <span className="text-sm">
              MitID {user.mitid_verified ? 'verificeret' : 'ikke verificeret'}
            </span>
          </div>
        </div>

        {/* Upgrade Section */}
        {showUpgrade && !isMitID && (
          <div className="pt-4 border-t border-nordic-200">
            <p className="mt-2 text-sm text-nordic-600">
              Verificer med MitID for at få adgang til køb og salg.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AuthLevelDisplay;
