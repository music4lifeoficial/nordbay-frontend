import { Suspense } from 'react';
import ProductDetail from '../../../components/products/ProductDetail';
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { publicationsApi } from '@/lib/api/publications';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const publication = await publicationsApi.getById(params.id);
    return {
      title: `${publication.title} | NordBay` ,
      description: publication.description?.slice(0, 160),
      openGraph: {
        title: publication.title,
        description: publication.description?.slice(0, 200),
        images: publication.primary_image ? [publication.primary_image] : publication.images?.length ? [publication.images[0]] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: publication.title,
        description: publication.description?.slice(0, 200),
        images: publication.primary_image ? [publication.primary_image] : publication.images?.length ? [publication.images[0]] : undefined,
      },
    };
  } catch {
    return { title: 'Product not found | NordBay' };
  }
}

// Server component wrapper to enforce auth level and provide suspense boundary
export default function ProductDetailPage() {
  return (
    <RequireAuthLevel level="public">
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <Suspense fallback={<div className="animate-pulse text-sm text-nordic-500">Loading product...</div>}>
          <ProductDetail />
        </Suspense>
      </div>
    </RequireAuthLevel>
  );
}
