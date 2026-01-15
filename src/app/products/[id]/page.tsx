import { Suspense } from 'react';
import ProductDetail from '../../../components/products/ProductDetail';
import { RequireAuthLevel } from '@/components/auth/RequireAuthLevel';
import { publicationsApi } from '@/lib/api/publications';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const publication = await publicationsApi.getById(id);
    const ogImage = publication.images?.length ? publication.images[0] : undefined;
    return {
      title: `${publication.title} | NordBay` ,
      description: publication.description?.slice(0, 160),
      openGraph: {
        title: publication.title,
        description: publication.description?.slice(0, 200),
        images: ogImage ? [ogImage] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: publication.title,
        description: publication.description?.slice(0, 200),
        images: ogImage ? [ogImage] : undefined,
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
