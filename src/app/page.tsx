// ===============================================
// NORDBAY HOME PAGE - TEMPORARY LANDING
// Main marketplace entry point
// ===============================================

export default function HomePage() {
  return (
    <main className="min-h-screen bg-nordic-gradient">
      {/* Hero Section */}
      <section className="nordic-container nordic-section text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo & Title */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-nordic-ocean">
              NordBay
            </h1>
            <p className="text-xl text-nordic-secondary max-w-2xl mx-auto">
              Nordic Marketplace for Conscious Consumers
            </p>
            <p className="text-lg text-muted-foreground">
              The Danish marketplace for authentic, quality products. 
              Buy and sell with confidence in our trusted Nordic community.
            </p>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Connected to Railway Backend
          </div>

          {/* Tech Stack Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="nordic-card p-4 text-center">
              <h3 className="font-semibold text-nordic-primary">Frontend</h3>
              <p className="text-sm text-muted-foreground">Next.js 15 + Vercel</p>
            </div>
            <div className="nordic-card p-4 text-center">
              <h3 className="font-semibold text-nordic-primary">Backend</h3>
              <p className="text-sm text-muted-foreground">Railway + PostgreSQL</p>
            </div>
            <div className="nordic-card p-4 text-center">
              <h3 className="font-semibold text-nordic-primary">Design</h3>
              <p className="text-sm text-muted-foreground">Nordic Minimalist</p>
            </div>
            <div className="nordic-card p-4 text-center">
              <h3 className="font-semibold text-nordic-primary">Auth</h3>
              <p className="text-sm text-muted-foreground">3-Tier + MitID</p>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="mt-16 space-y-8">
            <h2 className="text-3xl font-semibold text-nordic-primary">
              Coming Soon
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="nordic-card p-6 text-left">
                <h3 className="text-xl font-semibold mb-3">🔐 Authentication</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Email registration</li>
                  <li>• Light Account system</li>
                  <li>• MitID verification</li>
                  <li>• Secure JWT tokens</li>
                </ul>
              </div>
              
              <div className="nordic-card p-6 text-left">
                <h3 className="text-xl font-semibold mb-3">🛍️ Marketplace</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Product listings</li>
                  <li>• Advanced search</li>
                  <li>• Category filters</li>
                  <li>• Instagram-style gallery</li>
                </ul>
              </div>
              
              <div className="nordic-card p-6 text-left">
                <h3 className="text-xl font-semibold mb-3">💳 Commerce</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Stripe payments</li>
                  <li>• Danish shipping</li>
                  <li>• Order management</li>
                  <li>• Reviews & ratings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Status */}
          <div className="mt-16 p-6 bg-white/50 rounded-nordic border border-border">
            <h3 className="text-lg font-semibold mb-4 text-nordic-primary">
              📋 Implementation Progress
            </h3>
            
            <div className="space-y-3 text-left max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm">Project Setup & Configuration</span>
                <span className="text-sm font-medium text-green-600">✅ Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Client & Types</span>
                <span className="text-sm font-medium text-green-600">✅ Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Authentication System</span>
                <span className="text-sm font-medium text-yellow-600">⏳ In Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">UI Components</span>
                <span className="text-sm font-medium text-yellow-600">⏳ In Progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Marketplace Core</span>
                <span className="text-sm font-medium text-gray-400">⏸️ Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Integration</span>
                <span className="text-sm font-medium text-gray-400">⏸️ Pending</span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Built with Next.js 15, TypeScript, TailwindCSS & Railway<br/>
              Professional implementation for NordBay marketplace
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
