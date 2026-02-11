export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DISSUN',
    url: 'https://dissun.com',
    logo: 'https://dissun.com/logo.png',
    description: 'Luxury products and fine productry e-commerce platform offering premium healthes and productry with exceptional craftsmanship.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-STEM-LUX',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Luxury Avenue',
      addressLocality: 'Beverly Hills',
      addressRegion: 'CA',
      postalCode: '90210',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.instagram.com/dissun',
      'https://www.facebook.com/dissun',
      'https://www.twitter.com/dissun',
    ],
    // Google Merchant specific fields
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'US',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },
    // Shipping information for Google Merchant
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'USD',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'US',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}