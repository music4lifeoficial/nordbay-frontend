import { AppLayout } from '@/components/layout/AppLayout'

export default function FavoritesPage() {
  return (
    <AppLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-nordic-900 mb-6">My Favorites</h1>
        <p className="text-nordic-600">Your favorite items will appear here...</p>
      </div>
    </AppLayout>
  )
}
