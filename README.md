# DISSUN - Luxury Products E-Commerce

A production-ready luxury watch and productry e-commerce website built with Next.js 14, featuring a sophisticated admin dashboard, Stripe payments, and decentralized image storage on Storacha. Premium curated products and fine productry for discerning collectors.

## 🚀 Features

- **Luxury Theme**: DISSUN branding with elegant, sophisticated design
- **Premium Design**: Minimalist, black/white/gold palette with elegant typography
- **Luxury Focus**: Specialized e-commerce for luxury products and fine productry
- **Admin Dashboard**: Secure admin panel with authentication
- **Payment Processing**: Stripe Checkout integration
- **Image Management**: Decentralized image storage on Storacha/IPFS
- **SEO Optimized**: Dynamic metadata, OpenGraph, and sitemap
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized images and fast loading

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Image Storage**: Storacha (IPFS/Filecoin)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- MongoDB database
- Stripe account
- Storacha account
- Email service for NextAuth

## 🚀 Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dissun.git
   cd dissun
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in the following variables in `.env.local`:

   ```env
   # Database
   MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dissun"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # Email (for NextAuth)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="stella.montis@icloud.com"

   # Stripe
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # Storacha
   STORACHA_API_KEY="did:key:z6MkfVF5a2vAjrSKSoNSTqACnB9kJ42LUnK7GL3L7rf9d26Y"
   ```

4. **Set up the database**
   ```bash
   # MongoDB Atlas setup
   # Create cluster and update connection string in .env.local
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login

## 📦 Database Collections

The application uses the following MongoDB collections:

- **users**: Admin users for the dashboard
- **products**: Luxury watch and productry items
- **productImages**: Product images stored on decentralized IPFS network
- **orders**: Customer orders
- **orderItems**: Individual items in orders

## 🔐 Admin Setup

1. **Create an admin user**
   - Sign up using the admin login page with your email
   - Check your email for the magic link
   - Update the user's role to ADMIN in MongoDB:
     ```javascript
     db.users.updateOne(
       { email: 'your-admin-email@example.com' },
       { $set: { role: 'ADMIN' } }
     );
     ```

2. **Access the admin dashboard**
   - Visit `/admin` to access the dashboard
   - Manage products, view orders, and configure settings

## 💳 Stripe Setup

1. **Create a Stripe account** at https://stripe.com
2. **Get your API keys** from the Stripe dashboard
3. **Set up webhooks**:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhook`
   - Select events: `checkout.session.completed`
   - Copy the webhook secret to your environment variables

## 🖼️ Storacha Setup

1. **Create a Storacha account** at https://storacha.network
2. **Get your API key** from the Storacha dashboard
3. **Set the STORACHA_API_KEY** environment variable with your API key
4. Images are automatically optimized and stored on IPFS/Filecoin network

## 🚀 Deployment to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - Copy all variables from `.env.local`
   - Add `DATABASE_URL` for your production database
3. **Deploy** the application
4. **Update NextAuth URL** in environment variables to your production domain

## 📊 Database Management

### Development
```bash
# MongoDB is schemaless - just ensure connection
# Database operations are handled through native MongoDB driver
```

### Production
For production deployments:
```bash
# Ensure MongoDB Atlas cluster is configured
# Set proper indexes for performance:
db.products.createIndex({ slug: 1 })
db.products.createIndex({ category: 1 })
db.orders.createIndex({ stripeId: 1 })
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 📁 Project Structure

```
dissun/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── checkout/          # Checkout pages
│   ├── product/           # Product detail pages
│   └── ...                # Public pages
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   └── ...               # Public components
├── lib/                   # Utility functions
├── public/               # Static assets
└── ...
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please contact us at stella.montis@icloud.com or create an issue in this repository.