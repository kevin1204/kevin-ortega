# Kevin Ortega Rodriguez - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, dark/light theme support, and a comprehensive showcase of professional experience and projects.

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd kevin-resume
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── certifications/    # Certifications page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects listing
│   │   └── [slug]/        # Dynamic project pages
│   ├── timeline/          # Experience timeline
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── animated-timeline.tsx
│   ├── certifications-grid.tsx
│   ├── contact-form.tsx
│   ├── hero.tsx
│   └── ...
├── lib/                   # Utilities and configurations
│   ├── actions.ts         # Server actions
│   ├── animations.ts      # Framer Motion variants
│   ├── content.ts         # Content loading functions
│   ├── theme-provider.tsx # Theme context
│   └── types.ts          # TypeScript definitions
└── content/               # JSON content files
    ├── certifications.json
    ├── projects.json
    ├── site.json
    └── timeline.json
```

## 🎨 Customization

### Content Management

All content is stored in JSON files in the `/content` directory:

- **`site.json`** - Site configuration, contact info, and metadata
- **`timeline.json`** - Education and work experience entries
- **`certifications.json`** - Professional certifications and credentials
- **`projects.json`** - Portfolio projects with details and links

### Styling

The project uses Tailwind CSS with custom CSS variables for theming:

- **Colors**: Defined in `src/app/globals.css` with light/dark theme support
- **Typography**: Inter for UI text, Playfair Display for headings
- **Animations**: Framer Motion variants in `src/lib/animations.ts`

### Images

Replace placeholder images with your own:

- **Profile photo**: Update the image URL in `AboutHero` component
- **Project covers**: Replace URLs in `projects.json`
- **Logos**: Add your own SVG logos to `/public/logos/`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for production settings:

```env
# Contact Form (Optional)
RESEND_API_KEY=your_resend_api_key_here
CONTACT_FROM=noreply@yourdomain.com
CONTACT_TO=your-email@domain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Contact Form Setup

The contact form uses Resend for email delivery:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add it to your environment variables
4. Configure sender and recipient emails

If not configured, form submissions will be logged to the console in development.

## 📱 Features

- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Dark/Light Theme** - Persistent theme switching with smooth transitions
- ✅ **Smooth Animations** - Framer Motion for page transitions and micro-interactions
- ✅ **SEO Optimized** - Next.js metadata API, Open Graph, and JSON-LD
- ✅ **Performance** - Optimized images, lazy loading, and Core Web Vitals
- ✅ **Accessibility** - WCAG AA compliant with proper focus management
- ✅ **Contact Form** - Server actions with validation and rate limiting
- ✅ **Project Filtering** - Search and filter projects by tags
- ✅ **Timeline Animation** - Interactive experience/education timeline
- ✅ **Certification Links** - Direct links to external certificates

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The project is compatible with any platform that supports Next.js:

- **Netlify** - Use `npm run build` and deploy the `out` directory
- **Railway** - Connect your GitHub repository
- **DigitalOcean App Platform** - Deploy from GitHub

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run test         # Run tests
```

### Code Quality

The project includes:

- **ESLint** - Code linting with Next.js configuration
- **Prettier** - Code formatting
- **TypeScript** - Type safety and better developer experience
- **Husky** - Git hooks for pre-commit checks

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing this portfolio:

- **Email**: kevin.ortega2011@gmail.com
- **LinkedIn**: [linkedin.com/in/ksor](https://linkedin.com/in/ksor)
- **GitHub**: [github.com/kevin1204](https://github.com/kevin1204)

---

Built with ❤️ by Kevin Ortega Rodriguez