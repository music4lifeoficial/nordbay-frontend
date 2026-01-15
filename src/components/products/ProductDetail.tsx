"use client";
import React, { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { questionsApi } from '@/lib/api/publications';
import type { Publication, Question } from '@/types/api';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/useTranslation';
import { pushToast } from '@/hooks/use-toast';
import { usePublication, useFavorites, useToggleFavorite } from '@/lib/hooks/usePublications';
import { useCreateSale } from '@/lib/hooks/useSales';
import { useAuthStore } from '@/lib/stores/auth-store';

interface ImageGalleryProps { images: string[]; onSelect: (url: string) => void; selected: string | null; }
function ImageGallery({ images, onSelect, selected }: ImageGalleryProps) {
  if (!images?.length) return <div className="w-full h-full flex items-center justify-center text-nordic-300 text-4xl bg-nordic-100 rounded-lg">📦</div>;
  return (
    <div className="space-y-3">
      <div className="aspect-square w-full bg-nordic-100 rounded-lg overflow-hidden flex items-center justify-center">
        {selected ? <img src={selected} alt="Selected" className="object-cover w-full h-full" /> : <div className="text-nordic-300 text-5xl">📦</div>}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((img) => (
          <button key={img} onClick={() => onSelect(img)} className={`aspect-square rounded-md overflow-hidden border ${selected === img ? 'border-brand-500 ring-2 ring-brand-300' : 'border-transparent'}`}>
            <img src={img} alt="thumb" className="object-cover w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };
  const t = useTranslation();
  const { isAuthenticated } = useAuthStore();

  // React Query hooks
  const { data: product, isLoading: productLoading, error: productError } = usePublication(id);
  const { data: favoritesData } = useFavorites();
  const toggleFavoriteMutation = useToggleFavorite();
  const createSaleMutation = useCreateSale();

  // Local state for UI interactions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);
  const [related, setRelated] = useState<Publication[]>([]);

  // Derived state
  const loading = productLoading;
  const error = productError?.message;
  const favorited = favoritesData?.some((f: any) => f.id === product?.id) || false;
  const favLoading = toggleFavoriteMutation.isPending;
  const buyLoading = createSaleMutation.isPending;

  // Set selected image when product loads
  React.useEffect(() => {
    if (product && !selectedImage) {
      setSelectedImage(product.images?.[0] || null);
    }
  }, [product, selectedImage]);

  // Load questions and related products when product loads
  React.useEffect(() => {
    if (product?.id) {
      questionsApi.getForPublication(product.id).then(setQuestions).catch(() => {});
      // TODO: Add related products to React Query hooks when available
      // publicationsApi.getRelated(product.id, 4).then(setRelated).catch(() => {});
    }
  }, [product?.id]);

  const askQuestion = async () => {
    if (!questionText.trim()) return;
    if (!isAuthenticated) {
      router.push(`/auth/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setAsking(true);
    try {
      const q = await questionsApi.ask(id, questionText.trim());
      setQuestions(prev => [q, ...prev]);
      setQuestionText('');
      pushToast({ type: 'success', message: t.product?.questionPosted ?? 'Question posted' });
    } catch (e) {
      pushToast({ type: 'error', message: t.common?.error ?? 'Something went wrong.' });
    } finally {
      setAsking(false);
    }
  };

  const toggleFavorite = async () => {
    if (!product) return;
    if (!isAuthenticated) {
      router.push(`/auth/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    try {
      await toggleFavoriteMutation.mutateAsync(product.id);
      pushToast({ 
        type: 'success', 
        message: favorited 
          ? (t.product?.removedFavorite ?? 'Removed from favorites') 
          : (t.product?.addedFavorite ?? 'Added to favorites') 
      });
    } catch {
      pushToast({ type: 'error', message: t.common?.error ?? 'Something went wrong.' });
    }
  };

  const buyNow = async () => {
    if (!product) return;
    if (!isAuthenticated) {
      router.push(`/auth/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    try {
      const { payment_url } = await createSaleMutation.mutateAsync({ 
        publication_id: product.id, 
        payment_method: 'card' 
      } as any);
      pushToast({ type: 'success', message: t.product?.paymentRedirect ?? 'Redirecting to payment...' });
      if (payment_url) {
        window.location.href = payment_url;
      } else {
        // fallback: maybe open internal checkout modal (future)
      }
    } catch (e) {
      pushToast({ type: 'error', message: t.common?.error ?? 'Something went wrong.' });
    }
  };

  if (loading) return <div className="mt-10 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="aspect-square w-full bg-nordic-100 animate-pulse rounded-lg" />
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-nordic-100 animate-pulse rounded" />
        <div className="h-6 w-1/3 bg-nordic-100 animate-pulse rounded" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_,i)=><div key={i} className="h-3 w-full bg-nordic-100 animate-pulse rounded" />)}
        </div>
      </div>
    </div>
  </div>;
  if (error) return <Alert type="error" message={error} className="mt-6" />;
  if (!product) return null;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ImageGallery images={product.images} selected={selectedImage} onSelect={setSelectedImage} />
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-nordic-900 mb-2">{product.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-extrabold text-brand-600">{product.price} DKK</span>
              <span className="text-xs text-nordic-400 ml-auto">{product.category_id}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-nordic-800 mb-1 text-sm uppercase tracking-wide">{t.product?.description ?? 'Description'}</h2>
              <p className="text-nordic-700 text-sm leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1" size="lg" onClick={buyNow} disabled={buyLoading}>{buyLoading ? (t.common?.connecting ?? 'Connecting...') : (t.product?.buyNow ?? 'Buy now')}</Button>
            <Button className="flex-1" size="lg" variant={favorited ? 'secondary' : 'outline'} disabled={favLoading} onClick={toggleFavorite}>
              {favorited ? (t.product?.favorites ?? 'Favorites') : (t.product?.addToFavorites ?? 'Add to favorites')}
            </Button>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-nordic-800">{t.product?.questions ?? 'Questions & Answers'}</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={t.product?.askPlaceholder ?? 'Ask a public question about this item'}
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />
          <Button onClick={askQuestion} disabled={asking || !questionText.trim()} size="sm">{asking ? (t.product?.sending ?? 'Sending...') : (t.product?.ask ?? 'Ask')}</Button>
        </div>
        <div className="space-y-3">
          {questions.map(q => (
            <div key={q.id} className="p-3 rounded-lg bg-white border border-nordic-100 text-sm">
              <p className="font-medium text-nordic-800">{q.asked_by}</p>
              <p className="text-nordic-700 mt-1">{q.question}</p>
              {q.answer && (
                <div className="mt-2 border-l-2 pl-3 border-brand-300">
                  <p className="text-xs uppercase tracking-wide text-brand-600 font-semibold">{t.product?.seller ?? 'Seller'}</p>
                  <p className="text-nordic-700 text-sm mt-0.5">{q.answer}</p>
                </div>
              )}
            </div>
          ))}
          {!questions.length && <p className="text-xs text-nordic-400">{t.product?.noQuestions ?? 'No questions yet.'}</p>}
        </div>
      </div>

      {/* Related */}
      {!!related.length && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-nordic-800">{t.product?.related ?? 'Related items'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(r => (
              <div key={r.id} className="bg-white rounded-xl shadow-md border border-nordic-100 flex flex-col overflow-hidden cursor-pointer" onClick={() => router.push(`/products/${r.id}`)}>
                <div className="relative w-full h-36 bg-nordic-100 flex items-center justify-center">
                  {r.images?.[0] ? (
                    <img src={r.images[0]} alt={r.title} className="object-cover w-full h-full" />
                  ) : <div className="w-full h-full flex items-center justify-center text-nordic-300 text-3xl">📦</div>}
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <span className="text-brand-600 font-bold text-sm mb-1">{r.price} DKK</span>
                  <span className="font-semibold text-nordic-900 text-xs truncate">{r.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
