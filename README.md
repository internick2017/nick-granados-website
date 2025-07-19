# Nick Granados - Personal Website

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS, featuring Gumroad API integration for digital product sales.

## 🚀 Features

- **Modern Portfolio Design**: Clean, professional layout showcasing projects and skills
- **Dark/Light Mode**: Toggle between themes for better user experience
- **Responsive Design**: Optimized for all device sizes
- **Gumroad Integration**: OAuth authentication for API access
- **Fast Performance**: Built with Next.js 15 and optimized for speed
- **TypeScript**: Type-safe development experience

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)
- **API Integration**: Gumroad OAuth

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Gumroad account for API integration

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nick-granados-website.git
   cd nick-granados-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the project root:
   ```bash
   # Gumroad API Configuration
   GUMROAD_CLIENT_ID=your_gumroad_client_id
   GUMROAD_CLIENT_SECRET=your_gumroad_client_secret
   GUMROAD_REDIRECT_URI=http://localhost:3000/api/auth/gumroad/callback
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔗 Gumroad Integration Setup

### Step 1: Create Gumroad Application

1. Sign in to your [Gumroad account](https://gumroad.com)
2. Go to **Settings** → **Advanced** → **Applications**
3. Click **"Create application"**
4. Fill in the form:
   - **Application name**: `Nick Granados Website`
   - **Application icon**: Upload your logo
   - **Redirect URI**: `http://localhost:3000/api/auth/gumroad/callback`

### Step 2: Get Credentials

After creating the application, copy:
- **Application ID** (Client ID)
- **Application Secret** (Client Secret)

### Step 3: Update Environment Variables

Add your credentials to `.env.local`:
```bash
GUMROAD_CLIENT_ID=your_actual_client_id_here
GUMROAD_CLIENT_SECRET=your_actual_client_secret_here
```

### Step 4: Test the Integration

1. Start your development server
2. Visit `/dashboard` to test the OAuth flow
3. You should be redirected to Gumroad for authorization

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Update `GUMROAD_REDIRECT_URI` to your production URL:
     ```
     GUMROAD_REDIRECT_URI=https://yourdomain.com/api/auth/gumroad/callback
     ```

3. **Update Gumroad Application**
   - Go back to Gumroad application settings
   - Update the Redirect URI to your production URL

## 📁 Project Structure

```
nick-granados-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── gumroad/
│   │   │           └── callback/
│   │   │               └── route.ts      # OAuth callback handler
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Dashboard page
│   │   ├── globals.css                   # Global styles
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Homepage
│   └── components/
│       ├── about.tsx                     # About section
│       ├── contact.tsx                   # Contact section
│       ├── hero.tsx                      # Hero section
│       ├── navigation.tsx                # Navigation component
│       ├── projects.tsx                  # Projects showcase
│       ├── skills.tsx                    # Skills section
│       └── theme-provider.tsx            # Theme management
├── gumroad.config.example.js             # Configuration example
├── next.config.js                        # Next.js configuration
├── tailwind.config.ts                    # Tailwind CSS configuration
└── tsconfig.json                         # TypeScript configuration
```

## 🎨 Customization

### Personal Information

Update the content in these components:
- `src/components/hero.tsx` - Your name, title, and introduction
- `src/components/about.tsx` - About section content
- `src/components/skills.tsx` - Your technical skills
- `src/components/projects.tsx` - Your portfolio projects
- `src/components/contact.tsx` - Contact information

### Styling

- Colors and themes: `tailwind.config.ts`
- Global styles: `src/app/globals.css`
- Component styles: Individual component files

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📋 API Endpoints

- `GET /api/auth/gumroad/callback` - OAuth callback handler
- `GET /dashboard` - Dashboard page (requires authentication)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Nick Granados**
- Website: [your-website.com](https://your-website.com)
- Email: your-email@example.com
- LinkedIn: [linkedin.com/in/nick-granados](https://linkedin.com/in/nick-granados)

---

Built with ❤️ by Nick Granados | 6+ years of web development experience 