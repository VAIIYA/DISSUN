import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function SEOAdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-luxury-gray">
      <div className="bg-luxury-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-luxury-black">SEO & Google Merchant</h1>
              <p className="mt-1 text-sm text-gray-600">Manage SEO settings and Google Merchant feeds for DISSUN</p>
            </div>
            <a
              href="/admin"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Google Merchant Feeds */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Google Merchant Center Feeds - DISSUN</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">XML Product Feed</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Download the XML feed for Google Merchant Center submission.
                </p>
                <a
                  href="/api/google-merchant.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-luxury-gold text-luxury-black font-medium rounded hover:bg-luxury-black hover:text-luxury-gold transition-colors"
                >
                  Download XML Feed
                </a>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">CSV Product Feed</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Download the CSV feed for bulk Google Merchant submissions.
                </p>
                <a
                  href="/api/google-merchant.csv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-luxury-gold text-luxury-black font-medium rounded hover:bg-luxury-black hover:text-luxury-gold transition-colors"
                >
                  Download CSV Feed
                </a>
              </div>
            </div>
          </div>

          {/* SEO Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">SEO Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Structured Data</h3>
                <p className="text-sm text-gray-600">
                  All products include Schema.org markup, EAN structured data, and Google Merchant compatible fields with DISSUN branding.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Meta Tags</h3>
                <p className="text-sm text-gray-600">
                  SEO-optimized meta descriptions, Open Graph tags, and Twitter cards are automatically generated.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Sitemap</h3>
                <p className="text-sm text-gray-600">
                  XML sitemap is available at <code className="bg-gray-100 px-1 py-0.5 rounded">/sitemap.xml</code>
                </p>
              </div>
            </div>
          </div>

          {/* Google Merchant Setup Instructions */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Google Merchant Center Setup</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Step 1: Create Merchant Account</h3>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>Go to Google Merchant Center</li>
                  <li>Create a new account</li>
                  <li>Verify your website ownership</li>
                  <li>Set up your business information</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">Step 2: Upload Product Feed</h3>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>Download the XML or CSV feed above</li>
                  <li>In Merchant Center, go to Products → Feeds</li>
                  <li>Create a new feed</li>
                  <li>Upload your feed file</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">Step 3: Configure Settings</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>Set up tax and shipping settings</li>
                  <li>Configure return policies</li>
                  <li>Enable automatic item updates</li>
                  <li>Set up email notifications</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">Step 4: Link to Google Ads</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>Link your Google Ads account</li>
                  <li>Create Shopping campaigns</li>
                  <li>Set up product targeting</li>
                  <li>Monitor performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}